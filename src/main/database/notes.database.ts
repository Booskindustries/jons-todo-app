import { db } from './database'; // Shared database instance

// Create the notes table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Export database functions for notes
export const addNote = (content: string) => {
  const stmt = db.prepare('INSERT INTO notes (content) VALUES (?)');
  stmt.run(content);
};

export const deleteNote = (id: number) => {
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  stmt.run(id);
};

export const getNotes = () => {
  const stmt = db.prepare('SELECT * FROM notes ORDER BY created_at DESC');
  return stmt.all();
};