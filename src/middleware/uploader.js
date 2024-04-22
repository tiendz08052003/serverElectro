
import cloudinary from "./cloudinary.js";

async function uploadCloud(image, name) {
  // create promise for func
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, {
      upload_preset: 'unsigned_upload',
      public_id: name, 
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"]
      }, (err, result) => {
          if(err)
            reject(null); 
          else
            resolve(result.secure_url);
      })
  })
}


export default uploadCloud;
