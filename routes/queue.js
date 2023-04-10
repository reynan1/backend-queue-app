const express = require('express');
const router = express.Router();
const { addQueue, listQueue, serveQueue, serveQueueNow, serveDone } = require('../controller/queueController')

// router post method add queue function
router.post('/addOrder', (request, response) => {
    addQueue(request.body).then(
        resultFromController => response.send(resultFromController),
    );
})

router.get('/list', (request, response) => {
    listQueue().then(
        resultFromController => response.send(resultFromController),
    );
})

router.get('/serveNow', (request, response) => {
    serveQueueNow().then(
        resultFromController => response.send(resultFromController),
    );
})

router.put(`/serve/:serveId`, (request, response) => {
    serveQueue(request.params.serveId, request.body).then(
        resultFromController => response.send(resultFromController),
    );
})

router.put(`/serveDone/:userId`, (request, response) => {
    serveDone(request.params.userId, request.body).then(
        resultFromController => response.send(resultFromController),
    );
})

module.exports = router;