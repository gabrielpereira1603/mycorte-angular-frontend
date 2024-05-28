import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-default-login',
  standalone: true,
  imports: [],
  templateUrl: './default-login.component.html',
  styleUrls: ['./default-login.component.css']
})
export class DefaultLoginComponent implements AfterViewInit {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  @ViewChild('formSection') formSection!: ElementRef;

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }

  ngAfterViewInit() {
    this.checkScroll();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScroll();
  }

  checkScroll() {
    const formSection = this.formSection.nativeElement;
    const scrollArrowUp = formSection.querySelector('.scroll-arrow-up');
    const scrollArrowDown = formSection.querySelector('.scroll-arrow-down');

    if (formSection.scrollHeight > formSection.clientHeight) {
      scrollArrowDown.style.display = 'flex';
    } else {
      scrollArrowDown.style.display = 'none';
    }

    if (formSection.scrollTop > 0) {
      scrollArrowUp.style.display = 'flex';
    } else {
      scrollArrowUp.style.display = 'none';
    }
  }

  scrollDown() {
    const formSection = this.formSection.nativeElement;
    formSection.scrollBy({ top: 100, behavior: 'smooth' });
    setTimeout(() => this.checkScroll(), 300);
  }

  scrollUp() {
    const formSection = this.formSection.nativeElement;
    formSection.scrollBy({ top: -100, behavior: 'smooth' });
    setTimeout(() => this.checkScroll(), 300);
  }
}
