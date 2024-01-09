import express from "express";
import morgan from "morgan"
import route from './src/routes/index.js';
import db from "./src/config/db/index.js";
import methodOverride from 'method-override'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from "dotenv";
const app = express();
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from 'http';
import * as chatServices from  "./src/Services/chatServices.js"
const server = createServer(app); 
const io = new Server(server, {
    cors: {
      origin: "*"
    }
});


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

// ds user đã chat
let arrayChat = [];
let arrayQueue = [];

// socket.io
io.on("connection", (socket) => {
    console.log("Có nguồn kết nối: " + socket.id);
    
    socket.on("client-to-sever", (obj) => {
        arrayChat = obj.res.map(x => {
            return x.idAuth
        });
        const x = obj.res.filter(x => {
            if(x.queue == true && x.admin == false)
                return x.idAuth
        });
        arrayQueue = x.map(x => {
            return x.idAuth
        });
        const user = obj.res.filter(x => x.idAuth === obj.User._id)[0]
        if(!arrayChat.includes(obj.User._id)) {
            socket._id = obj.User._id
            socket.join(obj.User._id)
            socket.IdPhong = obj.User._id
            if(!obj.User.admin)
            {
                arrayQueue.push(obj.User._id)
            }
            const fetchAPI = async () => {
                await chatServices.createChat({
                    idAuth: obj.User._id,
                    idPhong: obj.User._id,
                    idKhachChat: "",
                    message: [],
                    queue: obj.User.admin ? false : true,
                    admin: obj.User.admin ? true : false
                })
            }
            fetchAPI();
            io.sockets.emit("sever-send-client-ConnectSuccess", socket.id);
        }
        else {
            socket._id = user.idAuth
            socket.join(user.idPhong)
            socket.IdPhong = user.idPhong
            io.sockets.emit("sever-send-client-Connected", socket.id);
            if(user.idKhachChat !== "")
            {
                socket.emit("sever-send-client-loadAgain");
            }
        }
        io.sockets.emit("sever-send-client-dsUserName", arrayQueue);
    })


    socket.on("client-to-sever-joinRoom", (arr) => {
        socket.join(arr[0])
        socket.IdPhong = arr[0]
        arrayQueue.splice(arrayQueue.indexOf(socket.IdPhong), 1)
        io.sockets.emit("sever-send-client-dsUserName", arrayQueue);
        io.sockets.in(socket.IdPhong).emit("sever-send-client-reply", {id: socket._id, idPhong: arr[0], idAdmin: arr[1]})
    })

    socket.on("client-to-sever-message", (arr) => {
        io.sockets.in(socket.IdPhong).emit("sever-send-client-message", arr)
        const fetchAPI = async () => {
            const res = await chatServices.getChat();
            const user = res.filter(x => x.idPhong == socket.IdPhong)
            user.forEach(x => {
                const fetchAPI1 = async () => {
                    arr.User.admin ? (
                        await chatServices.updateChat(x._id, {
                            message: [
                                ...x.message,
                                {
                                    admin: arr.messageInput
                                }
                            ]
                        })
                    ) : (
                        await chatServices.updateChat(x._id, {
                            message: [
                                ...x.message,
                                {
                                    user: arr.messageInput
                                }
                            ]
                        })
                    )
                }
                fetchAPI1();
            })
        }
        fetchAPI();
    })

    socket.on("client-to-sever-finnishChat", (id) => {
        arrayQueue.push(id);
        io.sockets.emit("sever-send-client-dsUserName", arrayQueue);
        io.sockets.in(socket.IdPhong).emit("sever-send-client-finishChat")
    })

    socket.on("sever-send-client-setIdPhong", () => {
        socket.leave(socket.IdPhong)
        socket.IdPhong = socket._id
    })

    const handleDisConnect = () => {
        arrayChat.splice(arrayChat.indexOf(socket._id), 1)
        if(arrayQueue.includes(socket._id))
        {
            arrayQueue.splice(arrayQueue.indexOf(socket._id), 1)
        }

        const fetchAPI = async () => {
            const res = await chatServices.getChat();
            const user = res.filter(x => x.idPhong == socket.IdPhong)
            user.forEach(x => {
                if(x.idAuth == socket._id)
                {
                    const fetchAPI1 = async () => {
                        await chatServices.deleteChat(x._id)
                    }
                    fetchAPI1()
                }
                else
                {
                    const fetchAPI1 = async () => {
                        await chatServices.updateChat(x._id, {
                            idPhong: x._id,
                            idKhachChat: "",
                            message: [],
                        })
                    }
                    fetchAPI1()
                }
            });
        }
        fetchAPI();
        socket.to(socket.IdPhong).emit("sever-send-client-disConnect");
        io.sockets.emit("sever-send-client-dsUserName", arrayQueue);
    }

    socket.on("client-send-sever-disconnect", () => {
        handleDisConnect();
    })

    socket.on("disconnect", () => {
        if(socket._id)
        {
            const fetchAPI = async () => {
                const res = await chatServices.getChat();
                const user = res.filter(x => x.idAuth == socket._id)[0]
                if(user.idKhachChat == "")
                {
                    handleDisConnect();
                }
            }
            fetchAPI();
        }
    });
})



// lắng  nghe port và kết nối
server.listen(port, () => {
    console.log("Listening port: " + port);
})