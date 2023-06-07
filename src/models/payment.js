const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const paymentSchema  = new schema({
    payment_id: {type: String, required:true},
    user_id: {type: schema.Types.ObjectId, ref: 'user_tb', required:true},
    amount: {type: String, required:true}
})

var paymentData = mongoose.model('payment_tb', paymentSchema)
module.exports = paymentData 