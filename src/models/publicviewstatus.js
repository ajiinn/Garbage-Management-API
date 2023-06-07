const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ajiinn:mongodbajin@cluster0.7cosbbg.mongodb.net/garbageDB?retryWrites=true&w=majority')
const schema = mongoose.Schema

const viewSchema  = new schema({
    status_id: {type: String, required:true},
    status: {type: String, required:true},
    description: {type: String, required:true}
})

var viewData = mongoose.model('publicViewStatus_tb', notifySchema)
module.exports = viewData 