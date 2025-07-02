const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(bodyParser.json());

app.use('/tasks', tasksRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
