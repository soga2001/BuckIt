import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../custom-components/input/input.component';
import type { LoginInfoInterface } from '../../../assets/interface/RegistrationInformation';
import { RegistrationService } from '../../service/registration.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-information',
  standalone: true,
  imports: [
    InputComponent, 
    CommonModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './login-information.component.html',
  styleUrl: './login-information.component.scss'
})
export class LoginInformationComponent implements OnInit {
  loginInformation: LoginInfoInterface = {} as LoginInfoInterface;

  constructor(public registrationService: RegistrationService, private router: Router) {}

  ngOnInit(): void {
    this.loginInformation = this.registrationService.registrationInformation.loginInformation;
  }

  nextStep() {
    let valid = false;
    valid = (this.loginInformation.email != '' && 
      this.loginInformation.password != '' && 
      this.loginInformation.confirm_password != '');
    valid = valid && (this.loginInformation.password === this.loginInformation.confirm_password);

    if(valid) {
      this.registrationService.registrationInformation.loginInformation = this.loginInformation;
      this.router.navigate(['/register/personal-information']);
    }
  }
  
}
