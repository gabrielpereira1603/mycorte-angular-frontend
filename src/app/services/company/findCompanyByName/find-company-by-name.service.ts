import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CompanyByName } from '../../../types/company/CompanyByName';

@Injectable({
  providedIn: 'root'
})
export class FindCompanyByNameService {

  private API = environment.apiUrl;

  constructor(private http: HttpClient) { }



  getCompanyByName(name: string): Observable<CompanyByName | null> { // Ajuste do tipo de retorno
    const url = `${this.API}/company/name/${name}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteWNvcnRlIiwic3ViIjoiY2xpZW50ZUBnbWFpbC5jb20iLCJleHAiOjE3MTcxODE5Nzl9.iDaMZqgunvyEEQYlU_vLjoUPEGbxteDBI6sQ9qM49kE'

    });

    return this.http.get<CompanyByName>(url, { headers }).pipe( // Ajuste do tipo de retorno
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null); // Usando 'of' para retornar null em caso de erro 404
        } else {
          return throwError(error);
        }
      })
    );
  }
}
