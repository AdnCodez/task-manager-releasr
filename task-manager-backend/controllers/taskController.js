const taskService = require('../services/taskService');
const logger = require('../utils/logger');

const getAllTasks = async (req, res, next) => {
	try {
		const tasks = await taskService.getAllTasks();
		res.json(tasks);
		logger.info('Fetched all tasks successfully');
	} catch (err) {
		next(err);
	}
};

const getTaskById = async (req, res, next) => {
	try {
		const task = await taskService.getTaskById(req.params.id);
		if (!task) {
			const error = new Error('Task not found');
			error.statusCode = 404;
			throw error;
		}
		res.json(task);
		logger.info(`Fetched task with ID: ${req.params.id}`);
	} catch (err) {
		next(err);
	}
};

const createTask = async (req, res, next) => {
	try {
		const newTask = await taskService.createTask(req.body);
		res.status(201).json(newTask);
		logger.info('Created a new task successfully');
	} catch (err) {
		next(err);
	}
};

const updateTask = async (req, res, next) => {
	try {
		const updatedTask = await taskService.updateTask(req.params.id, req.body);
		if (!updatedTask) {
			const error = new Error('Task not found');
			error.statusCode = 404;
			throw error;
		}
		res.json(updatedTask);
		logger.info(`Updated task with ID: ${req.params.id}`);
	} catch (err) {
		next(err);
	}
};

const deleteTask = async (req, res, next) => {
	try {
		const deletedTask = await taskService.deleteTask(req.params.id);
		if (!deletedTask) {
			const error = new Error('Task not found');
			error.statusCode = 404;
			throw error;
		}
		res.json({ message: 'Task deleted' });
		logger.info(`Deleted task with ID: ${req.params.id}`);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getAllTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
};
