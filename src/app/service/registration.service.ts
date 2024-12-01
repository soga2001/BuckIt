import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  registrationInformation = {
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
      private: '',
    },
    avatar: {
      avatar: '',
    }
  }
  constructor() { }
}
