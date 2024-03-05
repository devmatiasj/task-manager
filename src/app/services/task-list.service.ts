import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

const TASKS_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  constructor() {}

  getTasks(): Task[] {
    const tasksString = localStorage.getItem(TASKS_KEY);
    if (tasksString) {
      return JSON.parse(tasksString);
    }
    return [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
}