import { Component } from '@angular/core';
import { InputComponent } from '../../custom-components/input/input.component';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-login-information',
  standalone: true,
  imports: [
    InputComponent, 
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './login-information.component.html',
  styleUrl: './login-information.component.scss'
})
export class LoginInformationComponent {

}
