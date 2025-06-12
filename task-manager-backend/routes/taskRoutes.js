const express = require('express');
const router = express.Router();
const {
	validateCreateTask,
	validateUpdateTask,
	validateDeleteTask,
} = require('../middlewares/taskValidation');
const taskController = require('../controllers/taskController.js');

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.post('/', validateCreateTask, taskController.createTask);

router.put('/:id', validateUpdateTask, taskController.updateTask);

router.delete('/:id', validateDeleteTask, taskController.deleteTask);

module.exports = router;
