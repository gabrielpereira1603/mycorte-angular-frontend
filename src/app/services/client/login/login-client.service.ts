import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClientType } from '../../../types/client/clientType';
import { LoginResponseClient } from '../../../types/client/loginReponseClient';
import { SessionClientService } from '../session/session-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.sessionService.getToken() !== null);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionClientService,
  ) { }

  login(email: string, password: string): Observable<LoginResponseClient> {
    return this.httpClient.post<LoginResponseClient>(`${this.apiUrl}/client/login`, { email, password })
      .pipe(
        tap((response: LoginResponseClient) => {
          this.setSession(response, email);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  private setSession(response: LoginResponseClient, email: string): void {
    this.sessionService.setToken(response.token);
    this.fetchUserData(response.token, email).subscribe(client => {
      this.sessionService.setClient(client);
    });
  }

  private fetchUserData(token: string, email: string): Observable<ClientType> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<ClientType>(`${this.apiUrl}/client/email/${email}`, { headers });
  }

  logout(): void {
    this.sessionService.clear();
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.sessionService.getToken();
  }
}
