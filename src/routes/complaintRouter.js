const express = require('express')
const complaintRouter = express.Router()
const complaintDoc = require('../models/complaint')

complaintRouter.post('/complaint', async(req, res) => {
    try{
        const {complaint_id, complaint_title, description, user_id, date, time, reply} = req.body
        const complaint = {
            complaint_id,
            complaint_title,
            description,
            user_id,
            date,
            time,
            reply
        }
        await complaintDoc(complaint).save()
        res.status(201).json({success:true, error: false, message: 'Complaint registered successfully'})
    }    
    catch(err){
        res.status(400).json(err.message)
    }
})

module.exports = complaintRouter