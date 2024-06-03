import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ClientType } from '../../../types/client/clientType';


@Injectable({
  providedIn: 'root'
})
export class SingupService {
  private API = `${environment.apiUrl}/client/add`;
  constructor(private http: HttpClient) { }

  createClient(userData: {email:string, name: string, password: string, role: string, telephone: number}): Observable<ClientType> {

    return this.http.post<ClientType>(this.API, userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
