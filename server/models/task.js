const { bool, boolean } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

//Creating TaskSchema
const taskSchema = new Schema({
    title: {type: String, required: true},
    description:  {type: String, required: true},
    date:  {type: Date, default: Date.now },
    concluded:  {type: Boolean, required: true}
})

const Task = mongoose.model('Blog', taskSchema);

module.exports = {Task}