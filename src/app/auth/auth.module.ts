import { NgModule } from '@angular/core';
import { NbAuthModule, NbLoginComponent, NbRegisterComponent,
    NbLogoutComponent, NbResetPasswordComponent } from '@nebular/auth';
import { InverseAuthGuard } from './guards/inverse-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { nbAuthOptions } from './nb-auth-options';
import { CustomNbAuthComponent } from './components/auth.component';
import { NbCardModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

@NgModule({
    declarations: [CustomNbAuthComponent],
    imports: [
        CommonModule,
        RouterModule,
        NbAuthModule.forRoot(nbAuthOptions),
        NbCardModule,
        RouterModule.forChild([
            {
                path: 'auth',
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
    providers: [AuthGuard, InverseAuthGuard, AdminAuthGuard],
    exports: [RouterModule]
})
export class AuthModule { }
