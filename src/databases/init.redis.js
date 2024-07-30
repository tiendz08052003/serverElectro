'use strict'

import redis from 'redis';
import { RedisErrorResponse } from '../core/error.response.js';
import dotenv from 'dotenv';

// Nạp các biến môi trường từ tệp .env
dotenv.config();

const REDIS_CONNECT_TIMEOUT = 10000, REDIS_CONNECT_MESSAGE = {
    code: -99,
    message: {
        vn: 'Redis bị lỗi rồi!',
        en: 'Redis error!'
    }
} 

let client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error'
}, connectTimeout;

const handleTimeoutError = () => {
    connectTimeout = setTimeout(() => {
        throw new RedisErrorResponse({
            message: REDIS_CONNECT_MESSAGE.message.vn,
            statusCode: REDIS_CONNECT_MESSAGE.code
        }) 
    }, REDIS_CONNECT_TIMEOUT)
}

const handleEventConnection = ({
    connectionRedis
}) => {
    // Check if connection is null
    connectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log(`connectionRedis - Connection status: connected`)
        clearTimeout(connectTimeout);
    })

    connectionRedis.on(statusConnectRedis.END, () => {
        console.log(`connectionRedis - Connection status: disconnected`)
        handleTimeoutError();
    })

    connectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log(`connectionRedis - Connection status: reconnecting`)
        clearTimeout(connectTimeout);
    })

    connectionRedis.on(statusConnectRedis.ERROR, () => {
        console.log(`connectionRedis - Connection status: error`)
        handleTimeoutError();
    })
}

export const initRedis = () => {
    const instanceRedis = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }); 
    client.instanceConnect = instanceRedis;
    handleEventConnection({
        connectionRedis: instanceRedis
    });
}

export const getRedis = () => client

export const closeRedis = () => {
    client.instanceConnect.disconnect();;
}

