import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({
    status: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filter); // 🔹 Pasar los filtros al padre (TaskPage)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row align-items-end">
        <div className="col-md-4 mb-3">
          <label className="form-label">Estado</label>
          <select
            name="status"
            className="form-select"
            value={filter.status}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="completado">Completadas</option>
            <option value="pendiente">Pendientes</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Fecha de vencimiento</label>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={filter.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <button type="submit" className="btn btn-primary w-100">Filtrar</button>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
