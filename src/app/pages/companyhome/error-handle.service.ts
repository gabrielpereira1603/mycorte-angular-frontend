import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private toastrService: ToastrService,
    private router: Router
  ) {}

  handleCompanyNotFound(message: string): void {
    this.toastrService.error(message);
    this.router.navigate(['allcompany']);
  }

  handleCompanyError(error: any): void {
    this.toastrService.error("Empresa não encontrada. Você pode buscar a barbearia que deseja aqui!");
    this.router.navigate(['allcompany']);
  }
}
