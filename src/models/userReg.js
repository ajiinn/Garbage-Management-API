const mongoose  = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const userRegSchema = new schema({
    username: {type:String, required: true},
    name: {type:String, required: true},
    address: {type:String, required: true},
    email: {type:String, required: true},
    phonenumber: {type:String, required: true},
    location: {type:String, required: true},
    corporation_id: {type: schema.Types.ObjectId, ref: 'corporation_tb', required: true},
    login_id: {type: schema.Types.ObjectId, ref: 'login_tb', required:true},
})

var userRegdata = mongoose.model('user_tb', userRegSchema)
module.exports = userRegdata
