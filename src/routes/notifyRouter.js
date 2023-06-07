const express = require('express')
const notifyRouter = express.Router()
const notifyDoc = require('../models/notification')

notifyRouter.get('/notification', async(req, res) => {
    try{
        const notifications = await notifyDoc.find()
        res.json(notifications)
    }
    catch(err){
        res.status(500).json({ sucess: true, error:false, message:err.message })
    }
})

notifyRouter.get('/notification/:id', getNotification, (req, res) => {
    res.json(res.notification)
})

notifyRouter.post('/notification', async(req, res) => {
    const notification = {
        n_id: req.body.n_id,
        volunteer_id: req.body.volunteer_id,
        notifications: req.body.notifications
    }

    try{
        const newNotification = await notifyDoc(notification).save()
        res.status(201).json(newNotification)
    }
    catch(err){
        res.status(400).json({ success:false, error:false, message:err.message})
    }
})

notifyRouter.patch('/updatenotification', getNotification, async(req,res) => {
    if(req.body.n_id != null){
        res.notification.n_id = req.body.n_id
    }
    if(req.body.volunteer_id != null){
        res.notification.volunteer_id = req.body.volunteer_id
    }
    if(req.body.notifications != null){
        res.notification.notifications = req.body.notifications
    }

    try{
        const updateNotification = await res.notification.save()
        res.json(updateNotification)
    }
    catch(err){
        res.status(400).json({success: false, error:false, message:err.message})
    }
})

notifyRouter.delete('/notification/:id', getNotification, async(req,res) => {
    try{
        await res.notification.remove()
        res.json({ success:true, error:false, message: "Notification deleted"})
    }
    catch(err){
        res.status(500).json({ message: ere.message })
    }
})

async function getNotification(req, res, next){
    try{
        const notification = await notifyDoc.findById(req.params.id)
        if(notification == null){
            res.status(404).json({success:true, error:false, message: 'Cannot find notification'})
        }
        res.notification = notification
        next()
    }
    catch(err){
        return res.status(500).json({ success:false, error:false, message:err.message})
    }
}

module.exports = notifyRouter