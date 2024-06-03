import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CompanyType } from '../../../types/company/companyType';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindCompanyByTokenService {


  private API = environment.apiUrl;

  constructor(private http: HttpClient) { }



  getCompanyByToken(token: string): Observable<CompanyType | null> { // Ajuste do tipo de retorno
    const url = `${this.API}/company/token/${token}`;

    return this.http.get<CompanyType>(url).pipe( // Ajuste do tipo de retorno
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
