import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyExistsGuard implements CanActivateFn {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const companyName = route.paramMap.get('company')?.toLowerCase();
    console.log(`Checking company: ${companyName}`); // Debug log

    return this.http.get<boolean>(`${environment.apiUrl}/company/exists/${companyName}`).pipe(
      map(exists => {
        if (!exists) {
          console.log(`Company ${companyName} not found. Redirecting...`); // Debug log
          return this.router.parseUrl('/company-not-found'); // Navegar para uma URL de empresa não encontrada
        }
        return true; // Garante que o guarda retorne true para permitir a ativação
      }),
      catchError((error) => {
        console.error(`Error checking company: ${error}`); // Debug log
        return this.router.parseUrl('/company-not-found'); // Navegar para uma URL de empresa não encontrada em caso de erro
      })
    );
  }
}
