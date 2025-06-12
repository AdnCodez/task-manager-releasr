const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
	logger.error(`${err.message} - ${req.method} ${req.url} ppppppppppppppppp`);
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		message: err.message || 'Internal Server Error',
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

module.exports = errorHandler;
