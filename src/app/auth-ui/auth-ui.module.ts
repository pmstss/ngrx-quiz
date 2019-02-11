import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NbCardModule, NbCheckboxModule, NbAlertModule, NbInputModule } from '@nebular/theme';
import { CAPTCHA_KEY } from '../consts';
import { AuthGuard } from '../auth/guards/auth.guard';
import { InverseAuthGuard } from '../auth/guards/inverse-auth.guard';
import { CustomNbAuthComponent } from './components/auth.component';
import { AuthTitleComponent } from './components/auth-title/auth-title.component';
import { CustomNbRegisterComponent } from './components/register/register.component';
import { CustomNbLoginComponent } from './components/login/login.component';
import { CustomNbLogoutComponent } from './components/logout/logout.component';
import { CustomNbRequestPasswordComponent } from './components/request-password/request-password.component';
import { CustomNbResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
    declarations: [CustomNbLoginComponent, CustomNbRegisterComponent, CustomNbAuthComponent,
        CustomNbLogoutComponent, CustomNbRequestPasswordComponent, CustomNbResetPasswordComponent, AuthTitleComponent],
    imports: [
        CommonModule,
        FormsModule,
        NbCardModule,
        NbAuthModule,
        NbAlertModule,
        NbCheckboxModule,
        NbInputModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CustomNbAuthComponent,
                children: [
                    {
                        path: 'login',
                        canActivate: [InverseAuthGuard],
                        children: [
                            {
                                path: '',
                                component: AuthTitleComponent,
                                outlet: 'title',
                                data: { title: 'Login' }
                            },
                            {
                                path: '',
                                component: CustomNbLoginComponent
                            }
                        ]
                    },
                    {
                        path: 'register',
                        canActivate: [InverseAuthGuard],
                        children: [
                            {
                                path: '',
                                component: AuthTitleComponent,
                                outlet: 'title',
                                data: { title: 'Register' }
                            },
                            {
                                path: '',
                                component: CustomNbRegisterComponent
                            }
                        ]
                    },
                    {
                        path: 'logout',
                        canActivate: [AuthGuard],
                        children: [
                            {
                                path: '',
                                component: AuthTitleComponent,
                                outlet: 'title',
                                data: { title: 'Logout' }
                            },
                            {
                                path: '',
                                component: CustomNbLogoutComponent
                            }
                        ]
                    },
                    {
                        path: 'request-password',
                        canActivate: [InverseAuthGuard],
                        children: [
                            {
                                path: '',
                                component: AuthTitleComponent,
                                outlet: 'title',
                                data: { title: 'Forgot Password' }
                            },
                            {
                                path: '',
                                component: CustomNbRequestPasswordComponent
                            }
                        ]
                    },
                    {
                        path: 'reset-password',
                        canActivate: [InverseAuthGuard],
                        children: [
                            {
                                path: '',
                                component: AuthTitleComponent,
                                outlet: 'title',
                                data: { title: 'Change password' }
                            },
                            {
                                path: '',
                                component: CustomNbResetPasswordComponent
                            }
                        ]
                    }
                ]
            }
        ])
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: CAPTCHA_KEY } as RecaptchaSettings
        }
    ],
    exports: []
})
export class AuthUIModule { }
