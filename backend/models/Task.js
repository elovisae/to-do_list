const mongoose  = require('mongoose')
const Schema    = mongoose.Schema;

const taskSchema = new Schema({
    deadline: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    }

});

const Task  = mongoose.model('Task', taskSchema);
module.exports = Task;