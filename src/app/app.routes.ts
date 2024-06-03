import { Routes } from '@angular/router';
import { SingupClientComponent } from './pages/singup/singup.component';
import { ClienthomeComponent } from './pages/client/clienthome/clienthome.component';
import { CompanyNotFoundComponent } from './pages/company-not-found/company-not-found.component';
import { CompanyhomeComponent } from './pages/companyhome/companyhome.component';
import { AllcompanyComponent } from './pages/allcompany/allcompany.component';
import { CompanyExistsGuard } from './_guard/companyExistsGuard/company-exists.guard';
import { LoginClientComponent } from './pages/client/clientlogin/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'allcompany',
    pathMatch: 'full'
  },
  {
    path: 'companyhome/:token',
    component: CompanyhomeComponent,
  },
  {
    path: 'allcompany',
    component: AllcompanyComponent
  },
  {
    path: 'login/:token',
    component: LoginClientComponent,
    canActivate: [CompanyExistsGuard] // Adicione o guard à rota de login
  },
  {
    path: 'criarconta/:token',
    component: SingupClientComponent,
    canActivate: [CompanyExistsGuard] // Adicione o guard à rota de login
  },
  {
    path: 'clienthome/:token',
    component: ClienthomeComponent,
    canActivate: [CompanyExistsGuard] // Adicione o guard à rota de login
  },
  {
    path: 'company-not-found',
    component: CompanyNotFoundComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];
