import { Component, OnDestroy, OnInit } from '@angular/core';
import { FindCompanyByNameService } from '../../services/company/findCompanyByName/find-company-by-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CompanyByName } from '../../types/company/CompanyByName';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companyhome',
  standalone: true,
  imports: [CommonModule],
  providers: [
    ToastrService
  ],
  templateUrl: './companyhome.component.html',
  styleUrl: './companyhome.component.css'
})
export class CompanyhomeComponent implements OnInit{
  company: CompanyByName[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: FindCompanyByNameService,
    private toastrService: ToastrService
  ){}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.companyService.getCompanyByName(name).subscribe(
        dadosCompany => {
          if (dadosCompany !== null) {
            this.company = dadosCompany;
            console.log(this.company);
          } else {
            this.toastrService.error("Não foi possível econtrar a empresa!");
            this.router.navigate(['allcompany']);
          }
        },
        error => {
          this.toastrService.error("Empresa não encontrada.");
          console.error('Error fetching company data', error);
          // Trate outros erros aqui, se necessário
        }
      );
    } else {
      console.error('Parameter "name" not found in URL');
      // Tomar uma ação apropriada, como exibir uma mensagem de erro ou redirecionar o usuário
    }
  }


}
