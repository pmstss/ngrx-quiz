import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { NbAuthModule, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { BASE_URL } from '../consts';
import { SharedModule } from '../shared';
import { InverseAuthGuard } from './guards/inverse-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { nbAuthOptions } from './config/nb-auth-options';
import { CustomJWTInterceptor } from './interceptors/custom-jwt-intetceptor';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { AuthDialogService } from './services/auth-dialog.service';
import { AnonymousAuthService } from './services/anonymous-auth.service';

@NgModule({
    declarations: [AuthDialogComponent],
    entryComponents: [AuthDialogComponent],
    imports: [
        SharedModule,
        NbAuthModule.forRoot(nbAuthOptions)
    ],
    providers: [AnonymousAuthService, AuthDialogService, AuthGuard, InverseAuthGuard, AdminAuthGuard,
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
            useClass: CustomJWTInterceptor, // NbAuthJWTInterceptor doesn't handle case of simultaneous tokens refresh
            multi: true
        }
    ],
    exports: []
})
export class AuthModule { }
