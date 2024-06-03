import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../../components/default-login/default-login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../../components/input-primary/input-primary.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetAlertService } from '../../../AlertsService/SweetAlert';
import { FindCompanyByTokenService } from '../../../services/company/findCompanyByToken/find-company-by-token.service';
import { CompanyType } from '../../../types/company/companyType';
import { LoginClientService } from '../../../services/client/login/login-client.service';

interface LoginForm{
  email: FormControl,
  password: FormControl
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    InputPrimaryComponent
  ],
  providers: [
    LoginClientService,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginClientComponent {
  loginForm!: FormGroup;
  companyToken: string | null = null;
  company: CompanyType | null = null;
  isLoading = false;



  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loginService: LoginClientService,
    private toastService: ToastrService,
    private alert: SweetAlertService,
    private findCompanyByTokenService: FindCompanyByTokenService
  )
  {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  ngOnInit() {
    this.companyToken = this.activeRoute.snapshot.paramMap.get('token');
    if(!this.companyToken){
      this.alert.showErrorAlert('Empresa não encontrada', 'Não foi possível encontra a empresa!');
    }
  }



  submit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: () => {
          // Após o login bem-sucedido, redirecionar para uma página
          this.toastService.success("Usuário validado com sucesso.");
          this.router.navigate([`clienthome/${this.companyToken}`]); // Substitua 'home' pelo caminho desejado
        },
        error: () => {
          this.isLoading = false;
          this.toastService.error("Não foi possível validar o usuário.");
          console.error('Erro ao fazer login');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  navigate() {
    if(this.companyToken){
      this.router.navigate([`criarconta/${this.companyToken}`]);
    }else{
      this.router.navigate(['allcompany']);
    }
  }
}
