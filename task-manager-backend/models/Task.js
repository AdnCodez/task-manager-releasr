const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: String,
		dueDate: Date,
		status: { type: String, default: 'todo' },
		priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Task', taskSchema);
