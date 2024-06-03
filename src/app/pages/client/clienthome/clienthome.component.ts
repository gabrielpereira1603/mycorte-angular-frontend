import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyType } from '../../../types/company/companyType';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../../AlertsService/SweetAlert';
import { FindCompanyByTokenService } from '../../../services/company/findCompanyByToken/find-company-by-token.service';
import { CollaboratorType } from '../../../types/collaborator/collaboratorType';
import { CollaboratorByRoleService } from '../../../services/collaborator/getCollaboratorByRole/collaborator-by-role.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { SessionClientService } from '../../../services/client/session/session-client.service';

@Component({
  selector: 'app-clienthome',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './clienthome.component.html',
  styleUrl: './clienthome.component.css'
})
export class ClienthomeComponent implements OnInit {
  user: any;
  companyToken: string | null = null;
  company: CompanyType | null = null;
  collaborators: CollaboratorType[] = [];


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alert: SweetAlertService,
    private findCompanyByTokenService: FindCompanyByTokenService,
    private collaboratorByRoleService: CollaboratorByRoleService,
    private sessionService: SessionClientService // Injecting SessionClientService
  ) {}

  ngOnInit() {
    this.companyToken = this.activeRoute.snapshot.paramMap.get('token');
    this.user = this.sessionService.getClient(); // Using the session service to get the user

    if (!this.companyToken) {
      this.alert.showErrorAlert('Empresa não encontrada', 'Não foi possível encontrar a empresa!');
    } else {
      this.fetchCompanyByToken(this.companyToken);
    }
  }

  fetchCompanyByToken(companyToken: string) {
    this.findCompanyByTokenService.getCompanyByToken(companyToken).subscribe(
      company => {
        this.company = company;
        if (this.company && this.company.id) {
          this.fetchAllCollaborator(this.company.id);
        }
      },
      error => {
        this.alert.showErrorAlert('Erro', 'Não foi possível buscar a empresa!');
      }
    );
  }

  fetchAllCollaborator(companyID: number): void {
    this.collaboratorByRoleService.fetchAllCollaborator(companyID, 'COLLABORATOR').subscribe(
      collaborators => {
        this.collaborators = collaborators;
        console.log(this.collaborators)

      },
      error => {
        this.alert.showErrorAlert('Erro', 'Não foi possível buscar os colaboradores!');
      }
    );
  }
}
