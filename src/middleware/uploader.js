import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "dmzmrezmk",
  api_key: "411544666289579",
  api_secret: "X_VpZSx-98F5ziaibZTnwB4QVZE"
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'image_products'
  }
});

const uploadCloud = multer({ storage });

export default uploadCloud;
