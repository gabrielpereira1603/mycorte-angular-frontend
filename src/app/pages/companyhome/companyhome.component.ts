import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CompanyByName } from '../../types/company/CompanyByName';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from './error-handle.service';
import { FindByCompanyService } from '../../services/style/FindByCompany/find-by-company.service';
import { styleByCompany } from '../../types/style/styleByCompany';
import { FindCompanyByTokenService } from '../../services/company/findCompanyByToken/find-company-by-token.service';

@Component({
  selector: 'app-companyhome',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  providers: [
    ToastrService,
  ],
  templateUrl: './companyhome.component.html',
  styleUrls: ['./companyhome.component.css']
})
export class CompanyhomeComponent implements OnInit {
  company: CompanyByName | null = null;
  style: styleByCompany | null = null;
  logoUrl: string | null = null;
  companyToken: string | null = null; // Propriedade para armazenar o token da empresa

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: FindCompanyByTokenService,
    private styleService: FindByCompanyService,
    private toastrService: ToastrService,
    private errorHandleService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.companyToken = this.route.snapshot.paramMap.get('token'); // Armazena o token da empresa
    if (!this.companyToken) {
      this.errorHandleService.handleCompanyNotFound("Não foi possível encontrar a empresa!");
      return;
    }

    this.fetchCompanyByName(this.companyToken); // Passa o companyToken para o método fetchCompanyByName
  }

  private fetchCompanyByName(companyToken: string): void {
    this.companyService.getCompanyByToken(companyToken).subscribe(
      company => {
        this.company = company;
        this.styleService.getCompanyByName(String(company?.id))
          .subscribe(styles => {
            if (styles && styles.length > 0) {
              this.style = styles[0];
              if (this.style.logo) {
                // Decodificar a string base64 para obter os dados binários da imagem
                const binaryData = atob(this.style.logo);
                // Criar a URL de dados da imagem
                const imageUrl = `data:image/jpeg;base64,${binaryData}`;
                this.logoUrl = imageUrl;
              }
            }
          });
      },
      error => this.errorHandleService.handleCompanyError(error)
    );
  }

  navigateToSchedule(): void {
    // Navega para a página de visualização de horários
    this.router.navigate(['clienthome']);
  }

  navigateToLogin(): void {
    if (this.companyToken) {
      // Navega para a página de login com o token da empresa
      this.router.navigate([`login/${this.companyToken}`]);
    }
  }
}
