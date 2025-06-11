const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks');

app.use(express.json());
app.use('/tasks', tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
