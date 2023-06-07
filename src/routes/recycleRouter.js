const express = require('express')
const recycleRouter = express.Router()
const recycleDoc = require('../models/recyclestn')

recycleRouter.post('/recycling-stations', async (req, res) => {
    try {
      const { station_id, stationname, address, email, phone, location, corporation_id, login_id } = req.body
      const recycleStn = {
        station_id,
        stationname,
        address,
        email,
        phone,
        location,
        corporation_id,
        login_id
      }
      await recycleDoc(recycleStn).save()
      res.status(201).json({ success: true, error: false, data: recycleStn })
    } catch (error) {
      res.status(500).json({ success: false, error: true, message: error.message })
    }
})

recycleRouter.get('/recycling-stations/:id', async (req, res) => {
    try {
      const recycleStn = await recycleDoc.findById(req.params.id).populate('corporation_id').populate('login_id')
      if (recycleStn == null) {
        return res.status(404).json({ success: true, error: false, message: 'Cannot find recycling station' })
      }
      res.status(200).json({ success: true, data: recycleStn })
    } catch (err) {
      res.status(500).json({ success: false, error: true, message: err.message })
    }
})

recycleRouter.patch('/recycling-stations/:id', async (req, res) => {
    try {
      const recycleStn = await recycleStnData.findById(req.params.id)
      if (recycleStn == null) {
        return res.status(404).json({ success: true, error: false, message: 'Cannot find recycling station' })
      }
      const { station_id, stationname, address, email, phone, location, corporation_id, login_id } = req.body
      if (station_id != null) {
        recycleStn.station_id = station_id
      }
      if (stationname != null) {
        recycleStn.stationname = stationname
      }
      if (address != null) {
        recycleStn.address = address
      }
      if (email != null) {
        recycleStn.email = email
      }
      if (phone != null) {
        recycleStn.phone = phone
      }
      if (location != null) {
        recycleStn.location = location
      }
      if (corporation_id != null) {
        recycleStn.corporation_id = corporation_id
      }
      if (login_id != null) {
        recycleStn.login_id = login_id
      }
      const updatedRecycleStn = await recycleStn.save()
      res.status(200).json({ success: true, data: updatedRecycleStn })
    } catch (error) {
      res.status(500).json({ success: false, error: true, message: error.message })
    }
})

router.delete('/recycling-stations/:id', async (req, res) => {
    try {
      const recycleStn = await recycleDoc.findById(req.params.id)
      if (recycleStn == null) {
        return res.status(404).json({ success: true, error: false, message:'Recycle Station deleted' })
      }
    }
    catch(err){
      res.status(500).json({success:false, error:false, message:err.message})
    }
})

module.exports = recycleRouter
