import { NgModule } from '@angular/core';
import { NbAuthModule, NbLoginComponent, NbRegisterComponent, NbLogoutComponent,
    NbResetPasswordComponent, NbAuthComponent } from '@nebular/auth';
import { InverseAuthGuard } from './guards/inverse-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { nbAuthOptions } from './nb-auth-options';

@NgModule({
    declarations: [],
    imports: [
        NbAuthModule.forRoot(nbAuthOptions)
    ],
    providers: [AuthGuard, InverseAuthGuard, AdminAuthGuard],
    exports: []
})
export class AuthModule { }

export const authRouteConfig = {
    path: 'auth',
    component: NbAuthComponent,
    children: [
        {
            path: 'login',
            component: NbLoginComponent,
            // canActivate: [InverseAuthGuard]
        },
        {
            path: 'register',
            component: NbRegisterComponent,
            // canActivate: [InverseAuthGuard]
        },
        {
            path: 'logout',
            component: NbLogoutComponent,
            // canActivate: [AuthGuard]
        },
        {
            path: 'reset-password',
            component: NbResetPasswordComponent,
            // canActivate: [InverseAuthGuard]
        }
    ]
};
