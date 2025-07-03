import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('media');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, dueDate, priority });
      setTitle('');
      setDueDate('');
      setPriority('media');
      onTaskCreated(); // Recarga la lista
    } catch (err) {
      alert('Error al crear la tarea');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Nueva Tarea</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <table className="table table-bordered align-middle">
          <tbody>
            <tr>
              <td><label htmlFor="title" className="form-label mb-0">Título</label></td>
              <td>
                <input
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="dueDate" className="form-label mb-0">Fecha Límite</label></td>
              <td>
                <input
                  id="dueDate"
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="priority" className="form-label mb-0">Prioridad</label></td>
              <td>
                <select
                  id="priority"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-end">
                <button type="submit" className="btn btn-primary">
                  Crear Tarea
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default TaskForm;
