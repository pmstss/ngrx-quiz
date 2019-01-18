import { NgModule } from '@angular/core';
import { NbAuthModule, NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { InverseAuthGuard } from './guards/inverse-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { nbAuthOptions } from './config/nb-auth-options';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { BASE_URL } from '../consts';

@NgModule({
    declarations: [],
    imports: [
        NbAuthModule.forRoot(nbAuthOptions)
    ],
    providers: [AuthGuard, InverseAuthGuard, AdminAuthGuard,
        {
            provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
            useValue: (req: HttpRequest<any>) => !req.url.startsWith(BASE_URL)
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
