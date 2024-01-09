import Chat from "../model/chat.js";

const chatController = {
    getChat: (req, res, next) => {
        Chat.find()
            .then((data) => {
                res.json(data)
            })
            .catch(next)
    },

    create: (req, res, next) => {
        const data = new Chat(req.body)
        data.save()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    update: (req, res, next) => {
        Chat.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    delete: (req, res, next) => {
        Chat.findByIdAndDelete({_id: req.params.id})
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    replace: (req, res, next) => { 
        Chat.findByIdAndUpdate({_id: req.params.id}, req.body)
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    }
}

export default chatController;