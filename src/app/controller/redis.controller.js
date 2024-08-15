import {lPushPromise, lRangePromise, lSetPromise, lRemPromise, delPromise} from "../../Services/redis.service.js";

const redisController = {

    //[PUT] /cart/createCartRedis
    lPushPromise: async(req, res, next) => {
        try {
            const {
                collection,
                key,
                payload
            } = req.body;
            return res.json({
                data: await lPushPromise({
                    collection,
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
                collection,
                key
            } = req.body;
            const jsonStringArray = await lRangePromise(
                collection,
                key
            )
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
                collection,
                key,
                payload,
                index
            } = req.body;
            return res.json({
                data: await lSetPromise({
                    collection,
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
                collection,
                key,
                payload
            } = req.body;
            return res.json({
                data: await lRemPromise({
                    collection,
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
        try {
            const {
                collection,
                key
            } = req.body;
            return res.json({
                data: await delPromise({
                    collection,
                    key
                })
            });
        } catch (error) {
            next(error);
        }
        
    },
} 


export default redisController
