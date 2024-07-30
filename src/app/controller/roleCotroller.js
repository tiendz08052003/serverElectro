import Role from "../model/role.model.js";

const roleController = {
    role: (res, req, next) => {
        Role.find()
            .then(data => {
                req.status(200).json(data);
            }) 
            .catch(() => {
                res.status(404).json("Error");
            }) 
    }
}

export default roleController;