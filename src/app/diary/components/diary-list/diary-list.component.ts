import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Diary } from 'src/app/tasks/models/Diary';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent {
  @Input() diarys: Diary[] = []

  @Input() newStatus: string = 'Mark'

  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() remove = new EventEmitter(false)
  @Output() mark = new EventEmitter(false)


  onAdd() {
    this.add.emit(true)
  }

  onEdit(diary: Diary) {
    this.edit.emit(diary)
  }

  onRemove(diary: Diary) {
    this.remove.emit(diary)
  }

  onMark(diary: Diary) {
    this.mark.emit(diary)
  }

  getTooltipText(status: string): string {
    return status === 'Unmarked' ? 'Mark' : 'Unmark';
  }

}
