const db = require('../models/taskModel');
const { validateTask } = require('../validations/taskValidation');

// Obtener todas las tareas
const listTasks = (req, res, next) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Crear una nueva tarea
const createTask = (req, res, next) => {
  try {
    const task = validateTask(req.body);
    const { title, dueDate, priority = 'media', status = 'pendiente' } = task;

    db.run(
      `INSERT INTO tasks (title, dueDate, priority, status) VALUES (?, ?, ?, ?)`,
      [title, dueDate, priority, status],
      function (err) {
        if (err) return next(err);
        res.status(201).json({ id: this.lastID, ...task });
      }
    );
  } catch (err) {
    next(err);
  }
};

// Actualizar una tarea existente
const updateTask = (req, res, next) => {
  try {
    const task = validateTask(req.body);
    const { title, dueDate, priority = 'media', status = 'pendiente' } = task;
    const id = req.params.id;

    db.run(
      `UPDATE tasks SET title = ?, dueDate = ?, priority = ?, status = ? WHERE id = ?`,
      [title, dueDate, priority, status, id],
      function (err) {
        if (err) return next(err);
        if (this.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ id, ...task });
      }
    );
  } catch (err) {
    next(err);
  }
};

// Eliminar una tarea
const deleteTask = (req, res, next) => {
  const id = req.params.id;

  db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
    if (err) return next(err);
    if (this.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  });
};

// Cambiar el estado de una tarea (pendiente ↔ completado)
const toggleStatus = (req, res, next) => {
  const id = req.params.id;

  db.get(`SELECT status FROM tasks WHERE id = ?`, [id], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: 'Tarea no encontrada' });

    const newStatus = row.status === 'pendiente' ? 'completado' : 'pendiente';

    db.run(`UPDATE tasks SET status = ? WHERE id = ?`, [newStatus, id], function (err) {
      if (err) return next(err);
      res.json({ id, newStatus });
    });
  });
};

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleStatus,
};
