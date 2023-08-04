import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/tasks/models/Task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() remove = new EventEmitter(false)


  onAdd() {
    this.add.emit(true)
  }

  onEdit(task: Task) {
    this.edit.emit(task)
  }

  onDelete(task: Task) {
    this.remove.emit(task)
  }
}
