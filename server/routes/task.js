const router = require('express').Router();
const taskService = require('../controllers/taskController');

router.post("/:userId", taskService.createTask);
router.get("/list/:userId", taskService.listTasks);
router.delete("/:userId/:taskId", taskService.deleteTask);
router.get("/:taskId", taskService.getTask);
router.put("/:taskId", taskService.updateTask);


module.exports = router;