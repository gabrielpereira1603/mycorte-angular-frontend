import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SingupService {
  private API = `${environment.apiUrl}/client/add`; // Use a URL da API
  constructor(private http: HttpClient) { }

  createClient(userData: {name:string, telephone: string, email: string, password: string}): Observable<any>{
    return this.http.post(this.API, userData);
  }
}
