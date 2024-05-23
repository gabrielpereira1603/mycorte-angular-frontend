import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-default-login',
  standalone: true,
  imports: [],
  templateUrl: './default-login.component.html',
  styleUrl: './default-login.component.css'
})
export class DefaultLoginComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Output("submit") onSubmit = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

}
