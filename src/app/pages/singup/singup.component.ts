import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';

interface SingupForm{
  name: FormControl,
  telephone: FormControl,
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-singup',
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
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})

export class SingupComponent {
  singupForm!: FormGroup<SingupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  )
  {
    this.singupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.singupForm.value.email, this.singupForm.value.password).subscribe({
      next: () => this.toastService.success("Usuário válidado com sucesso."),
      error: () => this.toastService.error("Não foi possível validar o usuário."),
    })
  }

  navigate(){
    this.router.navigate(["login"])
  }
}
