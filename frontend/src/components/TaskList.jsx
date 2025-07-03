import React, { useState } from 'react';
import { deleteTask, updateTask, toggleTaskStatus } from '../services/taskService';


const TaskList = ({ tasks, onReload }) => {
  //const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({ title: '', dueDate: '', priority: 'media' });

  /*const loadTasks = async () => {
    const data = await getTasks();
    //orden de tareas por fecha mas cercana a la ultima
    data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setTasks(data);
  };

    useEffect(() => {
    loadTasks();
    }, [reloadFlag]);
    */
  const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta tarea?')) {
            await deleteTask(id);
            onReload();
        }
    };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditData({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority
    });
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditData({ title: '', dueDate: '', priority: 'media' });
  };

  const saveEdit = async () => {
        await updateTask(editingTaskId, editData);
        cancelEditing();
        onReload(); 
    };

  const toggleState = async (task) => {
        await toggleTaskStatus(task);
        onReload(); 
    };


  return (
    <div className="container mt-4">
      <h3>Lista de Tareas</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
        <tr>
            <th>Título</th>
            <th>Fecha Límite</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
          {tasks.map((task) =>
            editingTaskId === task.id ? (
              <tr key={task.id}>
                <td>
                  <input
                    className="form-control"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={editData.dueDate}
                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>Guardar</button>
                  <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>
                    <span className={`badge ${task.status === 'pendiente' ? 'bg-warning' : 'bg-success'}`}>
                    {task.status}
                    </span>
                </td>
                <td>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => toggleState(task)}>
                Cambiar estado
                </button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => startEditing(task)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>Eliminar</button>
                </td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
