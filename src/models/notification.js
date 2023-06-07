const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const notifySchema  = new schema({
    n_id: {type: String, required:true},
    volunteer_id: {type: schema.Types.ObjectId, ref: 'volunteer_tb', required:true},
    notifications: {type: String, required:true}
})

var notifyData = mongoose.model('notification_tb', notifySchema)
module.exports = notifyData 