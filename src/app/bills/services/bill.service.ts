import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first } from 'rxjs';
import { Bill } from 'src/app/tasks/models/Bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private readonly API = 'api/bills'

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Bill[]>(this.API)
      .pipe(
        first(),
      )
  }

  loadById(id: string) {
    return this.http.get<Bill>(`${this.API}/${id}`)
  }

  save(record: Partial<Bill>) {
    if(record._id) {
      return this.update(record)
    }

    return this.create(record)
  }

  private create(record: Partial<Bill>) {
    return this.http.post<Bill>(this.API, record).pipe(first())
  }

  private update(record: Partial<Bill>) {
    return this.http.put<Bill>(`${this.API}/${record._id}`, record).pipe(first())
  }

  updateStatus(record: Partial<Bill>, newStatus: string): Observable<Bill> {
    return this.http.patch<Bill>(`${this.API}/${record._id}/status`, newStatus).pipe(first());
  }

  remove(id: string) {
    return this.http.delete<Bill>(`${this.API}/${id}`).pipe(first())
  }
}
