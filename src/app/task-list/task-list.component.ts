import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskListService } from '../services/task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTask: Task = {task: '', checked: false};
  taskError: boolean = false;

  constructor(private taskListService: TaskListService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = this.taskListService.getTasks();
  }

  saveTasks(): void {
    this.taskListService.saveTasks(this.tasks);
  }

  addTask(): void {
    if (this.newTask.task.trim() !== '') {
      this.taskError = false;
      this.tasks.push(this.newTask);
      this.newTask = { task: '', checked: false }; 
      this.saveTasks();
    }else {
      this.taskError = true; 
    }
  }

  toggleTaskCompletion(task: Task): void {
    const index = this.tasks.indexOf(task);
    this.tasks[index].checked = !this.tasks[index].checked;
    this.saveTasks();
  }

  updateTaskList(task: Task): void{
    const index = this.tasks.indexOf(task);
    this.tasks[index].checked = task.checked;
  }

  removeTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }
}
