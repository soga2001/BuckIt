import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from '../../custom-components/input/input.component';
import { FormsModule } from '@angular/forms';
import type { PersonalInfoInterface } from '../../../assets/interface/RegistrationInformation';
import { RegistrationService } from '../../service/registration.service';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputComponent,
    FormsModule,
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {
  personalInformation: PersonalInfoInterface = {} as PersonalInfoInterface;

  constructor(public registrationService: RegistrationService, private router: Router) {}

  ngOnInit(): void {
    // if(this.registrationService.registrationInformation.loginInformation.email == '') {
    //   this.router.navigate(['/register']);
    // }
    this.personalInformation = this.registrationService.registrationInformation.personalInformation;
  }

  prevStep() {
    this.registrationService.registrationInformation.personalInformation = this.personalInformation;
    this.router.navigate(['/register']);
  }

  nextStep() {
    let valid = false;
    valid = (this.personalInformation.username != '' && this.personalInformation.phone_number != '');
    // valid = valid && (this.personalInformation.password === this.personalInformation.confirm_password);

    if(valid) {
      this.registrationService.registrationInformation.personalInformation = this.personalInformation;
      this.router.navigate(['/register/verify-account']);
    }
  }
}
