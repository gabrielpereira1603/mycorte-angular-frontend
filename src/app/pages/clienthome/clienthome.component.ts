import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-clienthome',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './clienthome.component.html',
  styleUrl: './clienthome.component.css'
})
export class ClienthomeComponent {

}
