import { Component, OnInit } from '@angular/core';
import { FindCompanyByNameService } from '../../services/company/findCompanyByName/find-company-by-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CompanyByName } from '../../types/company/CompanyByName';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from './error-handle.service';
import { FindByCompanyService } from '../../services/style/FindByCompany/find-by-company.service';
import { styleByCompany } from '../../types/style/styleByCompany';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: FindCompanyByNameService,
    private styleService: FindByCompanyService,
    private toastrService: ToastrService,
    private errorHandleService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) {
      this.errorHandleService.handleCompanyNotFound("Não foi possível encontrar a empresa!");
      return;
    }

    this.fetchCompanyByName(name);
  }

  private fetchCompanyByName(name: string): void {
    this.companyService.getCompanyByName(name).subscribe(
      company => {
        this.company = company;
        console.log(company)
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


}
