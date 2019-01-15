import { NgModule } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';
import { AppStoreModule } from '../store';
import { nbAuthOptions } from './nb-auth-options';

@NgModule({
    declarations: [],
    imports: [
        NbAuthModule.forRoot(nbAuthOptions),
        AppStoreModule
    ]
})
export class AuthModule { }
