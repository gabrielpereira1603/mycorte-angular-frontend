import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClientType } from '../../types/client/clientType';


@Injectable({
  providedIn: 'root'
})
export class SingupService {
  private API = `${environment.apiUrl}/client/add`;
  constructor(private http: HttpClient) { }

  createClient(userData: {email:string, name: string, password: string, role: string, telephone: number}): Observable<ClientType>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${environment.bearerToken}`

    })
    return this.http.post<ClientType>(this.API, userData);
  }
}
