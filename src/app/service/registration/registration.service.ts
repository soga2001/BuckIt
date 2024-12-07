import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { RegistrationInfoInterface } from '../../../assets/interface/RegistrationInformation';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  registrationInformation: RegistrationInfoInterface = {
    loginInformation: {
      email: '',
      password: '',
      confirm_password: ''
    },
    personalInformation: {
      username: '',
      full_name: '',
      phone_number: '',
      location: '',
      dob: '',
      website: '',
      bio: '',
      private: false,
    },
    avatar: {
      avatar: '',
    }
  }
  // constructor() { }

  private registrationComplete = new Subject<RegistrationInfoInterface>();
    
  registrationComplete$ = this.registrationComplete.asObservable();

  getRegistrationInformation() {
    return this.registrationInformation;
  }

  setRegistrationInformation(data: RegistrationInfoInterface) {
    this.registrationInformation = data;
  }

  completeRegistration() {
    this.registrationComplete.next(this.registrationInformation);
  }
}
