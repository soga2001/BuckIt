import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginInformationComponent } from './register/login-information/login-information.component';
import { PersonalInformationComponent } from './register/personal-information/personal-information.component';
import { UploadAvatarComponent } from './register/upload-avatar/upload-avatar.component';
import { VerifyAccountComponent } from './register/verify-account/verify-account.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BuckItsComponent } from './profile/buck-its/buck-its.component';
import { MediaComponent } from './profile/media/media.component';

export function usernameMatcher(url: UrlSegment[]): UrlMatchResult | null {
    if (url.length === 1 && /^@[\w]+$/.test(url[0].path)) {
      return {
        consumed: url,
        posParams: { username: new UrlSegment(url[0].path.slice(1), {}) }
      };
    }
    return null;
  }

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: "Home"
        }
    },
    {
        component: ProfileComponent,
        data: {
            title: "Profile"
        },
        // path: 'user/:username',
        matcher: (url) => {
            if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
              return {
                consumed: url,
                posParams: {
                  username: new UrlSegment(url[0].path.substr(1), {})
                }
              };
            }
            return null;
        },
        children: [
            {
                path: '',
                component: BuckItsComponent,
                data: {
                    title: "Buck Its"
                }
            },
            {
                path: 'media',
                component: MediaComponent,
                data: {
                    title: "Media"
                }
            }
        ]
    },
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
    },
    {
        path: '**',
        redirectTo: ''
    }
];
