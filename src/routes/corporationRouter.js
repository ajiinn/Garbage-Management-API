const express = require('express')
const corpRouter = express.Router()
const corpDoc = require('../models/corporation')

corpRouter.get('/corporations', async (req, res) => {
    try {
      const corporations = await corpDoc.find();
      res.json(corporations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
})

corpRouter.get('/corporations/:id', getCorporation, (req, res) => {
    res.json(res.corporation);
})

corpRouter.post('/corporations', async (req, res) => {
    const corporation = {
      corporation_id: req.body.corporation_id,
      corporationname: req.body.corporationname,
      email: req.body.email,
      phone: req.body.phone
    };
  
    try {
      const newCorporation = await corpDoc(corporation).save();
      res.status(201).json({success:true, error:false, message:newCorporation});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
})

corpRouter.patch('/corporations/:id', getCorporation, async (req, res) => {
    if (req.body.corporation_id != null) {
      res.corporation.corporation_id = req.body.corporation_id;
    }
    if (req.body.corporationname != null) {
      res.corporation.corporationname = req.body.corporationname;
    }
    if (req.body.email != null) {
      res.corporation.email = req.body.email;
    }
    if (req.body.phone != null) {
      res.corporation.phone = req.body.phone;
    }
  
    try {
      const updatedCorporation = await res.corporation.save();
      res.json(updatedCorporation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
})

corpRouter.delete('/delete-corporation/:id', getCorporation, async (req, res) => {
    try {
      await res.corporation.remove();
      res.json({ message: 'Corporation deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
})

async function getCorporation(req, res, next) {
    let corporation;
    try {
      corporation = await corpData.findById(req.params.id);
      if (corporation == null) {
        return res.status(404).json({ success:true, error:false, message: 'Cannot find corporation' });
      }
    } catch (err) {
      return res.status(500).json({ success:false, error:false, message: err.message });
    }
  
    res.corporation = corporation;
    next();
}

module.exports = corpRouter