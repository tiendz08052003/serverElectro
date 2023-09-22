import express from "express";
import morgan from "morgan"
import route from './src/routes/index.js';
import db from "./src/config/db/index.js";
import methodOverride from 'method-override'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const app = express();

// env
dotenv.config();

// cookieParser
// Phân tích nội dung có yêu cầu POST và PUT
app.use(cookieParser());

//connect moongoseDB
db.connect();

// Đường dẫn tương đối
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tạo port cho sever
const port = process.env.PORT || 3001;

app.use(methodOverride('_method'));

const corsOptions = {
    origin: process.env.REACT_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// cho phép kết nối với địa chỉ website khác
app.use(cors(corsOptions));

// Thiết lập nhận file json
app.use(express.json({limit: '50mb'}));

// Thiết lập nhận file url
app.use(express.urlencoded({limit: '50mb', extended: true}));

// link tới file public
app.use(express.static(path.join(__dirname, 'public')));

// console sau mỗi lần ctrl + s
app.use(morgan("dev"));

// làm views để dùng Embedded
app.set('view engine', 'ejs');

// nếu chỉ có file views/index.js thì không cần câu lệnh dưới đây
app.set('views', path.join('src', 'resources', 'views'));

// kết nối với các đường dẫn
route(app);

// lắng  nghe port và kết nối
app.listen(port, () => {
    console.log("Listening port: " + port);
})