import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { styleByCompany } from '../../../types/style/styleByCompany';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindByCompanyService {
  private API = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getCompanyByName(id: string): Observable<styleByCompany[] | null> {
    const url = `${this.API}/style/all/${id}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteWNvcnRlIiwic3ViIjoiY2xpZW50ZUBnbWFpbC5jb20iLCJleHAiOjE3MTcwNTAyNTh9.EmhFxOBGXIUMzPduVBhP4SKQ1OQcv1x48WfkXUexSE8'

    });

    return this.http.get<styleByCompany[]>(url, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
