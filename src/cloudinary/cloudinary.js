import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Nạp các biến môi trường từ tệp .env
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export default cloudinary