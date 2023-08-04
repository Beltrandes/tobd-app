import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first } from 'rxjs';
import { Diary } from 'src/app/tasks/models/Diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) { }

  private readonly API = 'api/diary'

  list() {
    return this.http.get<Diary[]>(this.API)
    .pipe(
      first(),
    )
  }

  loadById(id: string) {
    return this.http.get<Diary>(`${this.API}/${id}`).pipe(first())
  }

  save(record: Partial<Diary>) {
    if (record._id) {
      return this.update(record)
    }

    return this.create(record)
  }

  private create(record: Partial<Diary>) {
    return this.http.post<Diary>(this.API, record).pipe(first())
  }

  private update(record: Partial<Diary>) {
    return this.http.put<Diary>(`${this.API}/${record._id}`, record).pipe(first())
  }

  remove(id: string) {
    return this.http.delete<Diary>(`${this.API}/${id}`).pipe(first())
  }

  updateStatus(record: Partial<Diary>, newStatus: string) {
    return this.http.patch<Diary>(`${this.API}/${record._id}/status`, newStatus).pipe(first());
  }
}
