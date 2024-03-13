import Product from "../app/model/product.js";
import cloudinary from "./cloudinary.js";
function uploadCloud(name) {
  cloudinary.uploader.upload(req.body.image, {
    upload_preset: 'unsigned_upload',
    public_id: name, 
    allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"]
    }, (err, result) => {
        if(err)
          return null; 
        else
        {
            const data = new Product({
                ...req.body,
                image: result.secure_url
            });
            return data;
        }
    })
}


export default uploadCloud;
