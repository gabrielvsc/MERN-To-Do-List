const {Task} = require('../models/task');


exports.createTask = async (req, res) => {
    try {
        const task = await new Task({...req.body}).save();
        res.status(200).send({data: task,message: "Task created successfully" });
    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

exports.listTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send({data: tasks});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.taskId);
        res.status(201).send({message: "Task removed"});
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

// exports.updateTask = async (req, res) => {
//     try {
//         const id = req.params.taskId;
//         const body = req.body;
//         const task = await Task.findbyIdAndUpdate(id, {});
//         if (task == null){
//             res.status(404).send({message: "Task Not Found"});
//         } else {
//             res.status(200).send({data: task, message: "Task updated Sucefully"});
//         }
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error" });
//     }

// }