import { Component } from '@angular/core';
import { DefaultLoginComponent } from '../../components/default-login/default-login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertService } from '../../AlertsService/SweetAlert';
import { SingupService } from '../../services/client/singup/singup.service';

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
    ToastrService
  ],
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupClientComponent {
  singupForm!: FormGroup<SingupForm>;
  tokenCompany: string | null = null;
  isLoading = false;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastService: ToastrService,
    private singupService: SingupService,
    private sweetAlertService: SweetAlertService
  ) {
    this.singupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.tokenCompany = this.activeRoute.snapshot.paramMap.get('token');
  }

  submit() {
    if (this.singupForm.valid) {
      this.isLoading = true;
      const { name, telephone, email, password } = this.singupForm.value;
      const role = 'CLIENT';
      this.singupService.createClient({ email, name, password, role, telephone }).subscribe({
        next: () => {
          this.sweetAlertService.showSuccessAlert('Usuário cadastrado com sucesso!');
          localStorage.setItem('user', JSON.stringify({ email, name, role }));
          this.router.navigate([`login/${this.tokenCompany}`]);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          let errorMessage = 'Não foi possível criar o usuário.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.sweetAlertService.showErrorAlert('Erro de Cadastro', errorMessage);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  navigate() {
    if (this.tokenCompany) {
      this.router.navigate([`login/${this.tokenCompany}`]);
    } else {
      this.router.navigate(['allcompany']);
    }
  }
}
