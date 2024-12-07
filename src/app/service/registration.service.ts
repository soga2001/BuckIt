import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { RegistrationInfoInterface } from '../../assets/interface/RegistrationInformation';

// interface RegistrationInformation {
//   loginInformation: LoginInformation;
//   personalInformation: PersonalInformation;
//   avatar: Avatar;
// }

// interface LoginInformation {
//   email: string;
//   password: string;
//   confirm_password: string;
// }

// interface PersonalInformation {
//   username: string;
//   full_name: string;
//   phone_number: string;
//   location: string;
//   dob: string;
//   website: string;
//   bio: string;
//   private: boolean;
// }

// interface Avatar {
//   avatar: string;
// }

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
