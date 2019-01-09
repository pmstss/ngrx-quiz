import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    NbPasswordAuthStrategy,
    NbAuthModule,
    NbAuthComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbLogoutComponent,
    NbResetPasswordComponent,
    NbAuthJWTToken,
} from '@nebular/auth';

@NgModule({
    imports: [
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token'
                    },
                    baseEndpoint: 'http://localhost:3333/auth',
                    login: {
                        endpoint: '/login',
                        method: 'post'
                    },
                    logout: {
                        endpoint: '/logout',
                        method: 'post'
                    },
                    register: {
                        endpoint: '/register',
                        method: 'post'
                    },
                    resetPass: {
                        endpoint: '/reset',
                        method: 'post'
                    },
                    requestPass: false
                })
            ],
            forms: {}
        }),
        RouterModule.forChild([{
            path: '',
            component: NbAuthComponent,
            children: [
                {
                    path: 'login',
                    component: NbLoginComponent
                },
                {
                    path: 'register',
                    component: NbRegisterComponent
                },
                {
                    path: 'logout',
                    component: NbLogoutComponent
                },
                {
                    path: 'reset-password',
                    component: NbResetPasswordComponent
                }
            ]
        }])
    ]
})
export class LoginModule {
    constructor() {
        console.log('### LoginModule');
    }
}
