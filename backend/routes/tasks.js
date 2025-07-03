const express = require('express');
const router = express.Router();
const db = require('../models/taskModel'); // Ajusta la ruta según dónde esté tu archivo

const validateTask = (task) => {
  if (!task.title || task.title.trim() === '') return 'El título es obligatorio';

  if (!task.dueDate) return 'La fecha es obligatoria';

  // Descompón el dueDate en año, mes, día (por ej. '2025-07-04')
  const [year, month, day] = task.dueDate.split('-').map(Number);

  if (!year || !month || !day) return 'Fecha inválida';

  const taskDate = new Date(year, month - 1, day); // new Date(Y, M-1, D) siempre en local
  const today = new Date();

  // Normaliza ambas fechas a medianoche local
  taskDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Formatea ambas fechas a 'YYYY-MM-DD' para comparación confiable
  const taskDateStr = taskDate.toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];

  if (taskDateStr <= todayStr) return 'La fecha debe ser futura';

  return null;
};


// Obtener todas las tareas
router.get('/', (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nueva tarea
router.post('/', (req, res) => {
  console.log('Datos recibidos:', req.body);

  const error = validateTask(req.body);
  if (error) {
    console.log('Error validación:', error);
    return res.status(400).json({ error });
  }

  const { title, dueDate, priority } = req.body;
  const sql = `INSERT INTO tasks (title, dueDate, priority, status) VALUES (?, ?, ?, 'pendiente')`;
  db.run(sql, [title, dueDate, priority || 'media'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      title,
      dueDate,
      priority: priority || 'media',
      status: 'pendiente'
    });
  });
});

// Actualizar tarea
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const error = validateTask(req.body);
  if (error) return res.status(400).json({ error });

  const { title, dueDate, priority, status } = req.body;
  const sql = `
    UPDATE tasks SET title = ?, dueDate = ?, priority = ?, status = ?
    WHERE id = ?`;
  db.run(sql, [title, dueDate, priority || 'media', status || 'pendiente', id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ id, title, dueDate, priority: priority || 'media', status: status || 'pendiente' });
  });
});

// Eliminar tarea
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.run(sql, id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(204).end();
  });
});

module.exports = router;
