const router = require('express').Router();
const taskService = require('../controllers/taskController');


router.post("/", taskService.createTask);
router.get("/", taskService.listTasks);
router.delete("/:taskId", taskService.deleteTask);
// router.put("/:taskID", taskService.updateTask);

module.exports = router;