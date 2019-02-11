import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NbCardModule, NbCheckboxModule, NbAlertModule, NbInputModule } from '@nebular/theme';
import { CustomNbAuthComponent } from './components/auth.component';
import { CustomNbRegisterComponent } from './components/register/register.component';
import { CustomNbLoginComponent } from './components/login/login.component';
import { CustomNbLogoutComponent } from './components/logout/logout.component';
import { CustomNbRequestPasswordComponent } from './components/request-password/request-password.component';
import { InverseAuthGuard } from '../auth/guards/inverse-auth.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CAPTCHA_KEY } from '../consts';
import { CustomNbResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
    declarations: [CustomNbLoginComponent, CustomNbRegisterComponent, CustomNbAuthComponent,
        CustomNbLogoutComponent, CustomNbRequestPasswordComponent, CustomNbResetPasswordComponent],
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
                        component: CustomNbLoginComponent,
                        canActivate: [InverseAuthGuard]
                    },
                    {
                        path: 'register',
                        component: CustomNbRegisterComponent,
                        canActivate: [InverseAuthGuard]
                    },
                    {
                        path: 'logout',
                        component: CustomNbLogoutComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'request-password',
                        component: CustomNbRequestPasswordComponent,
                        canActivate: [InverseAuthGuard]
                    },
                    {
                        path: 'reset-password',
                        component: CustomNbResetPasswordComponent,
                        canActivate: [InverseAuthGuard]
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
