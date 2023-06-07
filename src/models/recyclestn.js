const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const recycleStnSchema  = new schema({
    station_id: {type: String, required:true},
    stationname: {type: String, required:true},
    address: {type: String, required:true},
    email: {type: String, required:true},
    phone: {type: String, required:true},
    location: {type: String, required:true},
    corporation_id: {type: schema.Types.ObjectId, ref: 'corporation_tb', required:true},
    login_id: {type: schema.Types.ObjectId, ref: 'login_tb', required:true},
})

var recycleStnData = mongoose.model('notification_tb', recycleStnSchema)
module.exports = recycleStnData 