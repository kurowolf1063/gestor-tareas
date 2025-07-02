const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Asegurarse de que el directorio /db exista
const dbDir = path.join(__dirname, '../db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      dueDate TEXT NOT NULL,
      priority TEXT CHECK(priority IN ('alta', 'media', 'baja')) DEFAULT 'media',
      status TEXT CHECK(status IN ('pendiente', 'completado')) DEFAULT 'pendiente'
    )
  `, (err) => {
    if (err) {
      console.error('Error creando tabla:', err.message);
    } else {
      console.log('Tabla de tareas lista');
    }
  });
});

module.exports = db;
