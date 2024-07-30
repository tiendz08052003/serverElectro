import express, { request } from 'express';
import pkg from 'node-machine-id';
const { machineIdSync } = pkg;
const route = express.Router();

route.get('/', (req, res, next) => {
    res.render("main/index");
});


route.get('/api/machineId', (req, res, next) => {
    // Synchronous usage
    try {
        const id = machineIdSync();
        res.json({id: id});
    } catch (err) {
        console.error('Error:', err);
    }
});



export default route