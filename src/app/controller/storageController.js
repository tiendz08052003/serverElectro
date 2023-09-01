import Storage from "../model/storage.js";

const storageController = {
    //[GET] /storage
    getStorage: (req, res, next) => {
        Storage.find()
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(404).json("Error!!!");
            })
    },

    //[POST] 
    store: (req, res, next) => {
        const data = new Storage(req.body);
        data.save()
            .then(() => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(404).json("Error!!!");
            }) 
    },

    //[POST] 
    delete: (req, res, next) => {
        Storage.deleteOne({refreshToken: req.params.id})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch(next) 
    }
}

export default storageController;