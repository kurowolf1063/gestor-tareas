import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import TaskCalendar from './TaskCalendar';
import { getTasks } from '../services/taskService';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromServer = await getTasks();
      setTasks(tasksFromServer);
      setFilteredTasks(tasksFromServer);
    };
    fetchTasks();
  }, [reloadFlag]);

  const handleReload = () => {
    setReloadFlag(prev => !prev);
  };

  const handleFilterChange = (filter) => {
    let filtered = [...tasks];

    if (filter.status) {
      filtered = filtered.filter((task) =>
        filter.status === 'completado'
          ? task.status === 'completado'
          : task.status === 'pendiente'
      );
    }

    if (filter.dueDate) {
      filtered = filtered.filter((task) => {
        if (!task.dueDate) return false;
        return task.dueDate.split('T')[0] === filter.dueDate;
      });
    }

    setFilteredTasks(filtered);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Gestión de Tareas</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card">
            <div className="card-body">
              <TaskForm onTaskCreated={handleReload} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <TaskCalendar tasks={filteredTasks} />
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <TaskList tasks={filteredTasks} reloadFlag={reloadFlag} />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
