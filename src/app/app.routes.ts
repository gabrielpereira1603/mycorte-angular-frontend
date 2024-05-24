import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeClienteComponent } from './components/home-cliente/home-cliente.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "criarconta",
    component: SingupComponent
  },
  {
    path: "clienthome",
    component: HomeClienteComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];
