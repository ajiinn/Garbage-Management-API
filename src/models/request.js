const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const requestSchema  = new schema({
    req_id: {type: schema.Types.ObjectId, ref: 'user_tb', required:true},
    user_id: {type: schema.Types.ObjectId, ref: 'user_tb', required:true},
    req_status: {type:String, required: true},
})

var requestData = mongoose.model('request_tb', requestSchema)
module.exports = requestData 