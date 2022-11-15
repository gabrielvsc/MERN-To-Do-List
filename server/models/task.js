const { bool, boolean } = require('joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

//Creating TaskSchema
const taskSchema = new Schema({
    title: {type: String, required: true},
    description:  {type: String, required: true},
    date:  {type: Date, default: Date.now },
    concluded:  {type: Boolean, required: false, default: false},
    user: { type: Schema.Types.ObjectId,
            ref: 'User'
        },
})
const Task = mongoose.model('Task', taskSchema);

module.exports = {Task , taskSchema}