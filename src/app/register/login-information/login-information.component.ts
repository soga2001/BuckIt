import { Component } from '@angular/core';
import { InputComponent } from '../../custom-components/input/input.component';

@Component({
  selector: 'app-login-information',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './login-information.component.html',
  styleUrl: './login-information.component.scss'
})
export class LoginInformationComponent {

}
