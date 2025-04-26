import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

// Define the database path
const dbPath = path.join(app.getPath('userData'), 'tasks.sqlite');
export const db = new Database(dbPath);
