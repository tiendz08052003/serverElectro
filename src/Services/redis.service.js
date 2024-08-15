import { getRedis } from "../databases/init.redis.js";

export const lPushPromise = async ({
    collection,
    key, 
    value
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.lpush(collection + ":" + key, [value], (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const rPushPromise = async ({
    collection,
    key, 
    value
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.rpush(collection + ":" + key, [value], (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
    }
}

export const lRangePromise = async ({
    collection,
    key
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.lrange(collection + ":" + key, 0, -1, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const lSetPromise = async ({
    collection,
    key, 
    value,
    index
}) => {
    const {
        instanceConnect : client
    } = getRedis()
    try {
        return new Promise((isOkay, isError) => {
            client.lset(collection + ":" + key, index, value, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const lRemPromise = async ({
    collection,
    key, 
    value
}) => {
    try {
        const {
            instanceConnect : client
        } = getRedis()
        return new Promise((isOkay, isError) => {
            client.lrem(collection + ":" + key, 0, value, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

export const delPromise = async ({
    collection,
    key
}) => {
    try {
        const {
            instanceConnect : client
        } = getRedis()
        return new Promise((isOkay, isError) => {
            client.del(collection + ":" + key, (err, rs) => {
                return !err ? isOkay(rs) : isError(err);   
            })   
        });
    } catch (error) {
        
    }
}

