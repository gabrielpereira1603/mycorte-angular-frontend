import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { ClienthomeComponent } from './pages/clienthome/clienthome.component';
import { CompanyNotFoundComponent } from './pages/company-not-found/company-not-found.component';
import { CompanyhomeComponent } from './pages/companyhome/companyhome.component';
import { AllcompanyComponent } from './pages/allcompany/allcompany.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'allcompany',
    pathMatch: 'full'
  },
  {
    path: 'companyhome/:name',
    component: CompanyhomeComponent
  },
  {
    path: 'allcompany',
    component: AllcompanyComponent
  },
  {
    path: 'login/:name',
    component: LoginComponent,
  },
  {
    path: 'criarconta/:name',
    component: SingupComponent,
  },
  {
    path: 'clienthome',
    component: ClienthomeComponent
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
