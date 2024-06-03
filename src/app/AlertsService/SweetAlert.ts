import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor() {}

  showSuccessAlert(message: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showErrorAlert(title: string, message: string): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: title,
      text: message,
      showConfirmButton: true
    });
  }
}
