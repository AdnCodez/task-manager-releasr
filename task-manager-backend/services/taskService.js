const Task = require('../models/Task');

const getAllTasks = async () => {
	return await Task.find();
};

const getTaskById = async (id) => {
	return await Task.findById(id);
};

const createTask = async (taskData) => {
	const task = new Task(taskData);
	return await task.save();
};

const updateTask = async (id, taskData) => {
	return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

const deleteTask = async (id) => {
	return await Task.findByIdAndDelete(id);
};

module.exports = {
	getAllTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
};
