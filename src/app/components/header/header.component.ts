import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnInit } from '@angular/core';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginClientService } from '../../services/client/login/login-client.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NgOptimizedImage,
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSmallScreen: boolean = false;
  headerHeight: number = 0;
  faDoorOpen = faDoorOpen;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faRightToBracket = faRightToBracket;
  companyToken: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver,
    private loginClientService: LoginClientService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.companyToken = this.activatedRoute.snapshot.paramMap.get('token');
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  isAuthenticated(): boolean {
    return this.loginClientService.isAuthenticated();
  }

  logout(): void{
    Swal.fire({
      title: "Você deseja sair?",
      text: "Ao sair tera que efetuar login novamente para agendar um horário!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, quero sair!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sessão Encerada!",
          text: "Redirecionando...",
          icon: "success"
        });

        this.loginClientService.logout();
        this.route.navigate([`login/${this.companyToken}`]);
      }
    });
  }

  navigateToLogin(): void {
    this.route.navigate([`login/${this.companyToken}`]);
  }

  navigateToSingup(): void {
    this.route.navigate([`criarconta/${this.companyToken}`]);
  }

  navigateToMyAccount():void {
    this.route.navigate([`criarconta/${this.companyToken}`])
  }
}
