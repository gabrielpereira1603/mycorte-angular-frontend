// company-exists.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importe 'map' de 'rxjs/operators'
import { FindCompanyByTokenService } from '../../services/company/findCompanyByToken/find-company-by-token.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyExistsGuard implements CanActivate {
  constructor(private companyService: FindCompanyByTokenService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const tokenCompany = next.paramMap.get('token');

    // Verificar se o nome da empresa não é nulo antes de prosseguir
    if (tokenCompany === null) {
      // Redirecionar para a página de empresa não encontrada
      this.router.navigate(['allcompany']);
      return false;
    }

    // Continuar com a verificação da existência da empresa
    return this.companyService.getCompanyByToken(tokenCompany).pipe(
      map(company => {
        if (company) {
          return true; // Permite a navegação
        } else {
          this.router.navigate(['allcompany']); // Redireciona para página de empresa não encontrada
          return false;
        }
      })
    );
  }
}
