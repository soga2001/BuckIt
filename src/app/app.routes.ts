import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginInformationComponent } from './register/login-information/login-information.component';
import { PersonalInformationComponent } from './register/personal-information/personal-information.component';
import { UploadAvatarComponent } from './register/upload-avatar/upload-avatar.component';
import { VerifyAccountComponent } from './register/verify-account/verify-account.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register'
        },
        children: [
            {
                path: '', // child route path
                component: LoginInformationComponent, // child route component that the router renders
            },
            {
                path: 'personal-information',
                component: PersonalInformationComponent, // another child route component that the router renders
            },
            {
                path: 'upload-avatar', // default child route
                component: UploadAvatarComponent, // another child route component that the router renders
            },
            {
                path: 'verify-account',
                component: VerifyAccountComponent, // another child route component that the router renders
            }
        ]
    }
];
