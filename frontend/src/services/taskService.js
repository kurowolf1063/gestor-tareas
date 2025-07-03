import axios from 'axios';

const API_URL = '/tasks'; // Usa el proxy configurado en package.json

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskStatus = async (task) => {
  const updatedTask = {
    ...task,
    status: task.status === 'pendiente' ? 'completado' : 'pendiente',
  };
  return updateTask(task.id, updatedTask);
};
