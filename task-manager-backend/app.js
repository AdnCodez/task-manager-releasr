require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Routes
app.use('/tasks', taskRoutes);

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB Atlas'))
	.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});
