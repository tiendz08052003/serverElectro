import Chat from "../app/model/chat.model.js"

const chat = (io) => {
    // ds user đã chat
    let arrayChat = [];
    let arrayQueue = [];
    io.on("connection", (socket) => {
        console.log("Có nguồn kết nối: " + socket.id);
        
        socket.on("client-to-sever", async (obj) => {
            arrayChat = obj.res?.map(x => {
                return x.idAccount
            });
            // Check user in queue
            const x = obj.res.filter(x => {
                if(x.queue == true && x.admin == false)
                    return true;
            });
            // Save queue
            arrayQueue = x.map(x => {
                return x.idAccount
            });
            
            if(!arrayChat.includes(obj.User._id)) {
                socket._id = obj.User._id
                socket.join(obj.User._id)
                socket.idRoom = obj.User._id
                if(obj.User.role !== "admin")
                {
                    arrayQueue.push(obj.User._id)
                }
                try {
                    const data = new Chat({
                        idAccount: obj.User._id,
                        idRoom: obj.User._id,
                        message: [],
                        queue: obj.User.role !== "admin" ? true : false,
                        admin: obj.User.role === "admin" ? true : false
                    })
                    await data.save();
                } catch (error) {
                    throw new Error(error);
                }
                io.sockets.emit("server-send-client-connectSuccess", socket.id);
            }
            else {
                const user = obj.res.find(x => x.idAccount === obj.User._id);
                const users = obj.res.filter(x => x.idRoom === user.idRoom);
                socket._id = user.idAccount
                socket.join(user.idRoom)
                socket.idRoom = user.idRoom
                io.sockets.emit("server-send-client-connected", socket.id);
                if(users.length === 2)
                {
                    io.to(socket.id).emit("server-send-client-loadAgain");
                }
            }
            io.sockets.emit("server-send-client-dsUserName", arrayQueue);
        })
    
    
        socket.on("client-to-server-joinRoom", (arr) => {
            socket.join(arr[0])
            socket.idRoom = arr[0]
            arrayQueue.splice(arrayQueue.indexOf(socket.idRoom), 1)
            io.sockets.emit("server-send-client-dsUserName", arrayQueue);
            io.sockets.in(socket.idRoom).emit("server-send-client-reply", {id: socket._id, idRoom: arr[0], idAdmin: arr[1]})
        })
    
        socket.on("client-to-server-message", async (arr) => {
            io.sockets.in(socket.idRoom).emit("server-send-client-message", arr)
            const res = await Chat.find();
            const users = res.filter(x => x.idRoom == socket.idRoom)
            users.forEach(async x => {
                arr.User.role === "admin" ? (
                    await Chat.findByIdAndUpdate({_id: x._id}, {
                        message: [
                            ...x.message,
                            {
                                admin: arr.messageInput
                            }
                        ]
                    })
                ) : (
                    await Chat.findByIdAndUpdate({_id: x._id}, {
                        message: [
                            ...x.message,
                            {
                                user: arr.messageInput
                            }
                        ]
                    })
                )
            })
        })
    
        socket.on("client-to-server-finnishChat", (id) => {
            arrayQueue.push(id);
            io.sockets.emit("server-send-client-dsUserName", arrayQueue);
            io.sockets.in(socket.idRoom).emit("server-send-client-finishChat")
        })
    
        socket.on("client-send-server-setIdRoom", () => {
            socket.leave(socket.idRoom)
            socket.idRoom = socket._id
        })
    
        const handleDisConnect = async () => {
            arrayChat.splice(arrayChat.indexOf(socket._id), 1)
            if(arrayQueue.includes(socket._id))
            {
                arrayQueue.splice(arrayQueue.indexOf(socket._id), 1)
            }
            const res = await Chat.find();
            const users = res.filter(x => x.idRoom == socket.idRoom)
            users.forEach(async x => {
                if(x.idAccount === socket._id)
                {
                    try {
                        await Chat.findByIdAndDelete({_id: x._id})
                    } catch (error) {
                        throw new Error(error);
                    }
                }
                else
                {
                    try {
                        await Chat.findByIdAndUpdate({_id: x._id}, {
                            idRoom: x._id,
                            idGuest: "",
                            message: [],
                        })
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            });
            socket.to(socket.idRoom).emit("server-send-client-disConnect");
            io.sockets.emit("server-send-client-dsUserName", arrayQueue);
        }
    
        socket.on("client-send-server-disconnect", () => {
            handleDisConnect();
        })
    
        socket.on("disconnect", async () => {

            if(socket._id)
            {
                try {
                    const res = await Chat.find({idRoom: socket.idRoom});
                    if(res.length == 1)
                    {
                        handleDisConnect();
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        });
    })
};

export default chat