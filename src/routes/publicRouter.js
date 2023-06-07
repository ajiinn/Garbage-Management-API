const express = require('express')
const publicRouter = express.Router()
const publicDoc = require('../models/publicviewstatus')

publicRouter.get('/view-data', async(req, res) => {
    try{
        const data = await viewData.find()
        res.json(data)
    }
    catch(err){
        res.status(500).json({success:false, error:false, message:err.message})
    }
})

publicRouter.get('/view-data/:id', async(req,res) => {
    try{
        const data = await publicDoc.findById(req.params.id)
        if(!data) throw Error('Data not found')
        res.json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

publicRouter.post('/view-data', async(req,res) => {
    const data = {
        status_id: req.body.status_id,
        status: req.body.status,
        description: req.body.description
    }
    try{
        const newData = await publicDoc(data).save()
        res.status(201).json({success:true, error:false, message: newData})
    }
    catch(err){
        res.status(400).json({success:false, error:false, message: err.message})
    }
})

publicRouter.put('/update-view-data/:id', async(req,res) => {
    try{
        const data = await publicDoc.findById(req.params.id)
        if(!data) throw Error('Data not found')

        data.status_id = req.body.status_id || data.status._id
        data.status = req.body.status || data.status
        data.description = req.body.description || data.description

        const updatedData = await data.save()
        res.json(updatedData)
    }
    catch(err){
        res.status(400).json({success: false, error: false, message:err.message})
    }
})

publicRouter.delete('/delete-view-data', async(req, res) => {
    try{
        const data = await publicDoc.findById(req.params.id)
        if(!data) throw Error('Data not found')
        
        await data.remove()
        res.json({ success:true, error:false, message:'Data deleted'})
    }
    catch(err){
        res.status(500).json({success:false, error:false, message:err.message })
    }
})

module.exports = publicRouter