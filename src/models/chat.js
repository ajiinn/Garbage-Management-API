const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const chatSchema  = new schema({
    chat_id: {type: String, required: true},
    user_id: {type: schema.Types.ObjectId, ref: 'user_tb', required:true},
    volunteer_id: {type: schema.Types.ObjectId, ref: 'volunteer_tb', required:true},
    status: {type:String, required: true},
    role: {type:String, required: true},    
})

var chatData = mongoose.model('chat_tb', chatSchema)
module.exports = chatData 