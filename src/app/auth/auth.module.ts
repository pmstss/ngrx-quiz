import { NgModule } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';
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
