import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = 'api/tasks'

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Task[]>(this.API)
    .pipe(
      first(),
    )
  }

  loadById(id: string) {
    return this.http.get<Task>(`${this.API}/${id}`)
  }

  save(record: Partial<Task>) {
    if(record._id) {
      return this.update(record)
    }

    return this.create(record)
  }

  private create(record: Partial<Task>) {
    return this.http.post<Task>(this.API, record).pipe(first())
  }

  private update(record: Partial<Task>) {
    return this.http.put<Task>(`${this.API}/${record._id}`, record).pipe(first())
  }

  remove(id: string) {
    return this.http.delete<Task>(`${this.API}/${id}`).pipe(first())
  }
}
