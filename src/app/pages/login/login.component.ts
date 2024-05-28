import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';

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
    LoginService,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm!: FormGroup;
  companyName: string | null = null;


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loginService: LoginService,
    private toastService: ToastrService
  )
  {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  ngOnInit() {

  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success("Usuário válidado com sucesso."),
      error: () => this.toastService.error("Não foi possível validar o usuário."),
    })
  }

  navigate(){
    this.router.navigate(["criarconta"])
  }
}
