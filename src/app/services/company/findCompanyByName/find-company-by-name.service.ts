import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CompanyByName } from '../../../types/company/CompanyByName';

@Injectable({
  providedIn: 'root'
})
export class FindCompanyByNameService {

  private API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompanyByName(name: string): Observable<Array<CompanyByName> | null> {
    const url = `${this.API}/company/name/${name}`; // Assumindo que a URL do endpoint seja assim
    return this.http.get<Array<CompanyByName>>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(null); // Retorna null em caso de erro 404 (Not Found)
        } else {
          return throwError(error); // Retorna o erro original para outros casos
        }
      })
    );
  }
}
