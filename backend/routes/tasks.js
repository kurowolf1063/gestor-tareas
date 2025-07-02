const express = require('express');
const router = express.Router();
const { listTasks, createTask, updateTask, deleteTask, toggleStatus } = require('../controllers/tasksController');

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', toggleStatus);

module.exports = router;
