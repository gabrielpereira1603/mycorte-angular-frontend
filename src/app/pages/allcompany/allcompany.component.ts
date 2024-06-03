import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allcompany',
  standalone: true,
  imports: [
  ],
  templateUrl: './allcompany.component.html',
  styleUrl: './allcompany.component.css'
})
export class AllcompanyComponent {
  companyToken: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
}
