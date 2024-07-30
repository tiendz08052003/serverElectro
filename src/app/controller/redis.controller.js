import {setPromise, getPromise, lPushPromise, lRangePromise, lSetPromise, lRemPromise, delPromise} from "../../Services/redis.service.js";

const redisController = {

    //[PUT] /cart/createCartRedis
    lPushPromise: async(req, res, next) => {
        try {
            const {
                key,
                payload
            } = req.body;
            return res.json({
                data: await lPushPromise({
                    key,
                    value: JSON.stringify(payload)
                })
            });
        } catch (error) {
            next(error);
        }
        
    },

    //[GET] /cart/cartRedis
    lRangePromise: async(req, res, next) => {
        try {
            const {
                key
            } = req.body;
            const jsonStringArray = await lRangePromise(key)
            const jsonArray = jsonStringArray.map(item => JSON.parse(item));
            return res.json({
                data: jsonArray
            });
        } catch (error) {
            next(error);
        }
        
    },

    // [PATCH] /cart/updateCartRedis
    lSetPromise: async(req, res, next) => {
        try {
            const {
                key,
                payload,
                index
            } = req.body;
            return res.json({
                data: await lSetPromise({
                    key,
                    value: JSON.stringify(payload),
                    index
                })
            });
        } catch (error) {
            next(error);
        }
        
    },
    
    // [PATCH] /cart/deleteCartRedis
    lRemPromise: async(req, res, next) => {
        try {
            const {
                key,
                payload
            } = req.body;
            return res.json({
                data: await lRemPromise({
                    key,
                    value: JSON.stringify(payload)
                })
            });
        } catch (error) {
            next(error);
        }
        
    },

    // [PATCH] /cart/deleteKeyCartRedis
    delPromise: async (req, res, next) => {
        console.log(req)
        try {
            const {
                key
            } = req.body;
            console.log(req.body)
            return res.json({
                data: await delPromise(key)
            });
        } catch (error) {
            next(error);
        }
        
    },

    //[PUT] /cart/create
    setPromise: async(req, res, next) => {
        try {
            const {
                key,
                payload
            } = req.body;
            return res.json({
                data: await setPromise({
                    key,
                    value: JSON.stringify(payload)
                })
            });
        } catch (error) {
            next(error);
        }
        
    },
    //[GET] /cart
    getPromise: async(req, res, next) => {
        try {
            const {
                key
            } = req.body;
            return res.json({
                data: JSON.parse(await getPromise(key))
            })
        } catch (error) {
            next(error);
        }
        
    },
} 


export default redisController
