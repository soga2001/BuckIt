import { Route, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
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


export function usernameMatcher(url: UrlSegment[], group: UrlSegmentGroup, route: Route): { consumed: UrlSegment[]; posParams?: { [key: string]: UrlSegment } } | null {
    if (url.length && url[0].path.startsWith('@')) {
        const username = url[0].path.slice(1); // Remove the '@'
        return {
        consumed: [url[0]],
        posParams: { username: new UrlSegment(username, {}) },
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
        component: ProfileComponent,
        data: {
            title: "Profile"
        },
        matcher: usernameMatcher,
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
    
];
