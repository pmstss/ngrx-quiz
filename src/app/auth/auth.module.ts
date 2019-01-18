import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { NbAuthModule, NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthJWTInterceptor } from '@nebular/auth';
import { BASE_URL } from '../consts';
import { InverseAuthGuard } from './guards/inverse-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { nbAuthOptions } from './config/nb-auth-options';

@NgModule({
    declarations: [],
    imports: [
        NbAuthModule.forRoot(nbAuthOptions)
    ],
    providers: [AuthGuard, InverseAuthGuard, AdminAuthGuard,
        {
            provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
            useValue: (req: HttpRequest<any>) => !req.url.startsWith(BASE_URL) ||
                    req.url.startsWith(`${BASE_URL}/auth/login`) ||
                    req.url.startsWith(`${BASE_URL}/auth/register`) ||
                    // token is sent in body for refresh-token
                    req.url.startsWith(`${BASE_URL}/auth/refresh-token`)
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NbAuthJWTInterceptor,
            multi: true
        }
    ],
    exports: []
})
export class AuthModule { }
