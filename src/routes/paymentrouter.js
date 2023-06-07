const express = require('express')
const paymentRouter = express.Router()
const paymentDoc = require('../models/payment')

paymentRouter.post('/payment', async(req, res) => {
    try{
        const {payment_id, user_id, amount} = req.body
        const payment = {
            payment_id,
            user_id,
            amount
        }
        await paymentDoc(payment).save()
        res.status(201).send(payment)
    }
    catch(err){
        res.status(402).send(err.message)
    }
})

module.exports = paymentRouter
