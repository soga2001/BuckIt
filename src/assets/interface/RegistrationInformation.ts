export interface RegistrationInfoInterface {
  loginInformation: LoginInfoInterface;
  personalInformation: PersonalInfoInterface;
  avatar: AvatarInterface;
}

export interface LoginInfoInterface {
  email: string;
  password: string;
  confirm_password: string;
}

export interface PersonalInfoInterface {
  username: string;
  full_name: string;
  phone_number: string;
  location: string;
  dob: string;
  website: string;
  bio: string;
  private: boolean;
}

export interface AvatarInterface {
  avatar: string;
}