const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const loginSchema  = new schema({
    login_id: {type: String, required: true},
    username: {type: String, required:true},
    password: {type: String, required:true},
    status: {type:String, required: true},
    role: {type:String, required: true},    
})

var loginData = mongoose.model('login_tb', loginSchema)
module.exports = loginData 