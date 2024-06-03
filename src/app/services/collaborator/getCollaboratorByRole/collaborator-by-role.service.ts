import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CollaboratorType } from '../../../types/collaborator/collaboratorType';
import { Observable, map } from 'rxjs';
import { RoleEnum } from '../../../types/collaborator/roleEnum';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorByRoleService {
  private API = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchAllCollaborator(companyID: number, role: string): Observable<CollaboratorType[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteWNvcnRlIiwic3ViIjoiY2xpZW50ZUBnbWFpbC5jb20iLCJleHAiOjE3MTczNjI5ODB9.B5jSu3Y4y_xhr4hYrXc7LmHakf3g3q9lBsLFu52yNQs'

    });
    let url = `${this.API}/collaborator/search/${role}/${companyID}`;
    return this.http.get<CollaboratorType[]>(url, { headers }).pipe(
      map(collaborators =>
        collaborators.map(collaborator => ({
          ...collaborator,
          role: collaborator.role as RoleEnum
        }))
      )
    );
  }
}
