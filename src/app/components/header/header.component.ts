import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, OnInit } from '@angular/core';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
export class HeaderComponent implements AfterViewInit, OnInit {
  isSmallScreen: boolean = false;
  headerHeight: number = 0;
  faDoorOpen = faDoorOpen;
  faUser = faUser;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  @ViewChild('headerElement', { static: true }) headerElement!: ElementRef;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.calculateHeaderHeight();
      window.addEventListener('resize', this.calculateHeaderHeight.bind(this));
    }
  }

  private calculateHeaderHeight() {
    if (isPlatformBrowser(this.platformId)) {
      this.headerHeight = this.headerElement.nativeElement.offsetHeight;
      document.body.style.paddingTop = `${this.headerHeight + 20}px`; // Adiciona um espaço extra de 20px
    }
  }
}
