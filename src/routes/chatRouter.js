const express = require('express')
const chatRouter = express.Router()
const chatDoc = require('../models/chat')

chatRouter.post('/chats', async(req, res) => {
    try{
        const { chat_id, user_id, volunteer_id, status, role } = req.body
        const chat = {
            chat_id,
            user_id,
            volunteer_id,
            status,
            role
        }
        await chatDoc(chat).save()
        res.status(201).json({ message: 'Chat created successfully'})
    }
    catch(err){
        res.status(400).json({ error:err.message })
    }
})

chatRouter.get('/chats', async(req, res) => {
    try{
        const chats = await chatDoc.find()
        res.status(201).json(chats)
    }
    catch(err){
        res.status(500).json({ error:err.message })
    }
})

chatRouter.get('/chats/:id', async(req, res) => {
    try{
        const chat = await chatDoc.findById(req.params.id)
        if(!chat){
            res.status(404).json({ success: true, error: false, message: 'Chat not found' })
        }
        res.status(201).json(chat)
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})

chatRouter.put('/chats/:id', async (req, res) => {
    try{
        const { chat_id, user_id, volunteer_id, status, role } = req.body
        const chat = await chatDoc.findByIdAndUpdate(req.params.id, {
            chat_id,
            user_id,
            volunteer_id,
            status,
            role
        })
        if(!chat){
            res.status(404).json({ success:false, error:false, message: 'Chat not found' })
        }
        res.status(200).json({success:true, error: false, message: 'Chat updated successfully' })
    }
    catch(err){
        res.status(500).json({ success:false, error:err.message})
    }
})

chatRouter.delete('/chats/:id', async(req,res) => {
    try{
        const chat = await chatDoc.findByIdAndDelete(req.params.id)
        if(!chat){
            return res.status(404).json({ success:false, error:false, message: 'Chat not found'})
        }
        res.status(200).json({success:true, error:false, message: 'Chat deleted successfully'} )
    }
    catch(err){
        res.status(500).json({ success:false, error:err.message})
    }
})

module.exports = chatRouter

