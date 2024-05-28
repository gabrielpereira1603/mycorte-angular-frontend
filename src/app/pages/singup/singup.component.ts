import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { SingupService } from '../../services/singup/singup.service';

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
    private toastService: ToastrService,
    private singupService: SingupService
  )
  {
    this.singupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.singupForm.valid) {
      const { name, telephone, email, password } = this.singupForm.value;
      this.singupService.createClient({ name, telephone, email, password }).subscribe({
        next: () => this.toastService.success("Usuário cadastrado com sucesso!"),
        error: () => this.toastService.error("Não foi possível criar o usuário.")
      });
    } else {
      this.toastService.error("Por favor, preencha todos os campos corretamente.");
    }
  }

  navigate(){
    this.router.navigate(["login"])
  }
}
