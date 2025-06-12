require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');
const logger = require('./utils/logger');

const seedData = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		logger.info('Connected to MongoDB Atlas');

		const tasks = [
			{
				title: 'Task 1',
				description: 'Description for Task 1',
				dueDate: new Date(),
				status: 'todo',
				priority: 'high',
			},
			{
				title: 'Task 2',
				description: 'Description for Task 2',
				dueDate: new Date(),
				status: 'in-progress',
				priority: 'medium',
			},
			{
				title: 'Task 3',
				description: 'Description for Task 3',
				dueDate: new Date(),
				status: 'done',
				priority: 'low',
			},
		];
		await Task.deleteMany({});
		logger.info('Cleared existing tasks');

		await Task.insertMany(tasks);
		logger.info('Seed data inserted successfully');

		await mongoose.connection.close();
		logger.info('Database connection closed');
	} catch (err) {
		logger.error(`Error seeding data: ${err.message}`);
		process.exit(1);
	}
};

seedData();
