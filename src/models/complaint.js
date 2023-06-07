const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const complaintSchema  = new schema({
    complaint_id: {type: String, required: true},
    complaint_title: {type: String, required:true},
    description: {type: String, required:true},
    user_id: {type: schema.Types.ObjectId, ref: 'user_tb', required:true},
    date: {type: String, required:true},
    time: {type: String, required:true},
    reply: {type: String, required:true},
})

var complaintData = mongoose.model('complaint_tb', complaintSchema)
module.exports = complaintData