const express = require('express') 
const rqstRouter = express.router()
const rqstDoc = require('../models/request')

rqstRouter.get('/requests', async (req, res) => {
    try{
        const requests = await rqstDoc.find()
        res.json(requests)
    } 
    catch(err){
        res.status(500).json({message: err.message})
    }
})

rqstRouter.post('/request', async(req,res) => {
    const request = {
        req_id: req.body.req_id,
        user_id: req.body.user_id,
        req_status: req.body.req_status,
    }

    try{
        const newRequest = await rqstDoc(request).save()
        res.status(201).json(newRequest)
    }
    catch(err){
        res.status(400).json({})
    }
})

module.exports = rqstRouter