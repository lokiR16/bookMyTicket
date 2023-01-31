import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
const endpoint = 'https://zincubate.in/api/MovieTicketChecker?';
const email = 'logeshrangababu@gmail.com';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public selectedTheatre;
  public movieDetail = new BehaviorSubject<any>(null);
  movieDetail$ = this.movieDetail.asObservable();

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.post(endpoint + 'action=getAllDetails', email);
  }

  bookTicket(data): Observable<any> {
    return this.http.post(endpoint + 'action=bookSeats', data);
  }
}
