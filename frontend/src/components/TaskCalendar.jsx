import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = ({ tasks }) => {
  const [date, setDate] = useState(new Date());

  // Filtrar tareas para la fecha seleccionada
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === date.toDateString();
  });

  return (
    <div>
      <h2>Calendario de Tareas</h2>
      <Calendar onChange={setDate} value={date} />
      <h3>Tareas para el {date.toDateString()}:</h3>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.completed ? 'Completada' : 'Pendiente'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCalendar;
