const { body, param, validationResult } = require('express-validator');

const validateCreateTask = [
	body('title').notEmpty().withMessage('Title is required'),
	body('description')
		.optional()
		.isString()
		.withMessage('Description must be a string'),
	body('dueDate')
		.optional()
		.isISO8601()
		.withMessage('Due date must be a valid date'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

const validateUpdateTask = [
	param('id').isMongoId().withMessage('Invalid task ID'),
	body('title').optional().notEmpty().withMessage('Title cannot be empty'),
	body('description')
		.optional()
		.isString()
		.withMessage('Description must be a string'),
	body('dueDate')
		.optional()
		.isISO8601()
		.withMessage('Due date must be a valid date'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

const validateDeleteTask = [
	param('id').isMongoId().withMessage('Invalid task ID'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = {
	validateCreateTask,
	validateUpdateTask,
	validateDeleteTask,
};
