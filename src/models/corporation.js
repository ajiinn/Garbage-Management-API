const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const corpSchema  = new schema({
    corporation_id: {type: String, required:true},
    corporationname: {type: String, required:true},
    email: {type: String, required:true},
    phone: {type: String, required:true}
})

var corpData = mongoose.model('corporation_tb', corpSchema)
module.exports = corpData 