import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { SingupService } from '../../services/singup/singup.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

interface SingupForm {
  name: FormControl;
  telephone: FormControl;
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    DefaultLoginComponent,
    ReactiveFormsModule,
    InputPrimaryComponent,
    SweetAlert2Module,
    CommonModule
  ],
  providers: [
    LoginService,
    ToastrService
  ],
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  singupForm!: FormGroup<SingupForm>;
  companyName: string | null = null;
  isLoading = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private activeRoute: ActivatedRoute,
    private toastService: ToastrService,
    private singupService: SingupService
  ) {
    this.singupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.companyName = this.activeRoute.snapshot.paramMap.get('name');
  }

  submit() {
    if (this.singupForm.valid) {
      this.isLoading = true;
      const { name, telephone, email, password } = this.singupForm.value;
      const role = 'CLIENT';
      this.singupService.createClient({ email, name, password, role, telephone }).subscribe({
        next: () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuário cadastrado com sucesso!",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            localStorage.setItem('user', JSON.stringify({ email, name, role }));
            this.router.navigate(['/dashboard']);
          });
        },
        error: () => {
          this.toastService.error("Não foi possível criar o usuário.");
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.toastService.error("Por favor, preencha todos os campos corretamente.");
    }
  }

  navigate() {
    if (this.companyName) {
      this.router.navigate([`login/${this.companyName}`]);
    } else {
      this.router.navigate(['allcompany']);
    }
  }
}
