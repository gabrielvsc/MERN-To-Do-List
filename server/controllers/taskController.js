const {Task} = require('../models/task');
const {User} = require('../models/user');

exports.createTask = async (req, res) => {
    try {
        const user = await Task.create({...req.body, user: req.params.userId}).then(async (docTask) => {
            return await User.findByIdAndUpdate(req.params.userId, 
                { $push : {tasks: {...docTask}},         
                }, {new: true, useFindAndModify: false},
            ).select("tasks");
        });
        res.status(200).send({data: user,message: "Task created successfully" });
    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

exports.listTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.params.userId});
        res.status(200).send({data: tasks});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.taskId).then(async (docTask) => {
            if(docTask == null){
                return res.status(404).send({message: "Task not found"});
            }else{
                User.findById(req.params.userId).then(async(docUser) => {
                    docUser.tasks = docUser.tasks.filter(t => t != req.params.taskId);
                    res.status(200).send({data: docUser,message: "Task removed"});
                    await docUser.save();
                });

            }
            
        });
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if(task == null || task == []){
            res.status(404).send({message: "Task not found"});
        } else {
            res.status(200).send({data: task,message: "Task found"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (task == null) {
            res.status(404).send({message: "Task not found"});
        }else{
            task.title = req.body.title;
            task.description = req.body.description;
            task.date = req.body.date;
            task.concluded = req.body.concluded;
            await task.save();

            res.status(200).send({data: task});
        }

    } catch (error) {
        res.status(500).send({message: "Internal Server Error" });
    }
}