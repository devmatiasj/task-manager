import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

const TASKS_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    const tasksString = localStorage.getItem(TASKS_KEY);
    if (tasksString) {
      const tasks = JSON.parse(tasksString);
      this.tasksSubject.next(tasks);
    }
  }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }
}
