import { NgModule } from '@angular/core';
import { NbLoginComponent, NbRegisterComponent,
    NbLogoutComponent, NbResetPasswordComponent, NbAuthModule } from '@nebular/auth';
import { CustomNbAuthComponent } from './components/auth.component';
import { NbCardModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InverseAuthGuard } from '../auth/guards/inverse-auth.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@NgModule({
    declarations: [CustomNbAuthComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbAuthModule,
        RouterModule.forChild([
            {
                path: '',
                component: CustomNbAuthComponent,
                children: [
                    {
                        path: 'login',
                        component: NbLoginComponent,
                        canActivate: [InverseAuthGuard]
                    },
                    {
                        path: 'register',
                        component: NbRegisterComponent,
                        canActivate: [InverseAuthGuard]
                    },
                    {
                        path: 'logout',
                        component: NbLogoutComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'reset-password',
                        component: NbResetPasswordComponent,
                        canActivate: [InverseAuthGuard]
                    }
                ]
            }
        ])
    ],
    providers: [],
    exports: []
})
export class AuthUIModule { }
