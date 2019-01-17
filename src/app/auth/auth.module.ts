import { NgModule } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';
import { InverseAuthGuard } from './guards/inverse-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { nbAuthOptions } from './config/nb-auth-options';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';

@NgModule({
    declarations: [],
    imports: [
        NbAuthModule.forRoot(nbAuthOptions)
    ],
    providers: [AuthGuard, InverseAuthGuard, AdminAuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    exports: []
})
export class AuthModule { }
