import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskListService } from '../services/task-list.service';
import { Task } from '../models/task.model';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';


describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskListServiceSpy: jasmine.SpyObj<TaskListService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskListService', ['getTasks', 'saveTasks']);

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      providers: [
        { provide: TaskListService, useValue: spy }
      ],
      imports: [ TableModule, FormsModule, CheckboxModule, DialogModule, InputTextModule ] 
    }).compileComponents();

    taskListServiceSpy = TestBed.inject(TaskListService) as jasmine.SpyObj<TaskListService>;
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on init', () => {
    const tasks: Task[] = [
      { task: 'Task 1', checked: false },
      { task: 'Task 2', checked: true }
    ];
    taskListServiceSpy.getTasks.and.returnValue(tasks);

    fixture.detectChanges();

    expect(component.tasks).toEqual(tasks);
  });

  it('should add task', () => {
    const newTask: Task = { task: 'New Task', checked: false };
    component.newTask = newTask;

    component.addTask();

    expect(component.tasks).toContain(newTask);
    expect(taskListServiceSpy.saveTasks).toHaveBeenCalled();
  });

  it('should toggle task completion', () => {
    const tasks: Task[] = [
      { task: 'Task 1', checked: false },
      { task: 'Task 2', checked: true }
    ];
    component.tasks = tasks;
    const taskToToggle = tasks[0];

    component.toggleTaskCompletion(taskToToggle);

    expect(taskToToggle.checked).toBe(true);
    expect(taskListServiceSpy.saveTasks).toHaveBeenCalled();
  });

  it('should remove task', () => {
    const tasks: Task[] = [
      { task: 'Task 1', checked: false },
      { task: 'Task 2', checked: true }
    ];
    component.tasks = tasks;
    const taskToRemove = tasks[0];

    component.removeTask(taskToRemove);

    expect(component.tasks).not.toContain(taskToRemove);
    expect(taskListServiceSpy.saveTasks).toHaveBeenCalled();
  });
});

