import { db } from './database'; // Shared database instance

// Create the tasks table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT NOT NULL,
    status TEXT DEFAULT 'Pending'
  )
`);

// Export database functions for tasks
export const addTask = (title: string, description: string, dueDate: string) => {
  const stmt = db.prepare('INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)');
  stmt.run(title, description, dueDate);
};

export const deleteTask = (id: number) => {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(id);
};

export const updateTask = (id: number, title: string, description: string, dueDate: string) => {
  const stmt = db.prepare('UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?');
  stmt.run(title, description, dueDate, id);
};

export const getTasks = () => {
  const stmt = db.prepare('SELECT * FROM tasks');
  return stmt.all();
};

export const updateTaskStatus = (id: number, status: string) => {
  const stmt = db.prepare('UPDATE tasks SET status = ? WHERE id = ?');
  stmt.run(status, id);
};