import { getRedis } from "../databases/init.redis.js";


export const lPushPromise = async ({
    key, 
    value
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.lpush("cart:" + key, [value], (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const lRangePromise = async (key) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.lrange("cart:" + key, 0, -1, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const lSetPromise = async ({
    key, 
    value,
    index
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.lset("cart:" + key, index, value, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const setPromise = async ({
    key, 
    value
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.set(key, value, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}
    
export const getPromise = async (key) => {
    try {
        const {
            instanceConnect : client
        } = getRedis()
        return new Promise((isOkay, isError) => {
            client.get(key, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const lRemPromise = async ({key, value}) => {
    try {
        const {
            instanceConnect : client
        } = getRedis()
        return new Promise((isOkay, isError) => {
            client.lrem("cart:" + key, 0, value, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const delPromise = async (key) => {
    try {
        const {
            instanceConnect : client
        } = getRedis()
        return new Promise((isOkay, isError) => {
            client.del("cart:" + key, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

