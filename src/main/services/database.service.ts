
import TaskService  from './tasks.service';
import NoteService from './note.service';

class DatabaseService {
  TaskService: TaskService;
  NoteService: NoteService;

  constructor() {
    this.TaskService = new TaskService();
    this.NoteService = new NoteService();
  }
}

export default DatabaseService;