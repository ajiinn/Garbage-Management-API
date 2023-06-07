const mongoose  = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const volunteerRegSchema = new schema({
    volunteer_id: {type:String, required: true},
    volunteername: {type:String, required: true},
    address: {type:String, required: true},
    email: {type:String, required: true},
    phone: {type:String, required: true},
    corporation_id: {type: schema.Types.ObjectId, ref: 'corporation_tb', required:true},
    login_id: {type: schema.Types.ObjectId, ref: 'login_tb', required:true},
})

var volunteerRegdata = mongoose.model('volunteer_tb', volunteerRegSchema)
module.exports = volunteerRegdata
