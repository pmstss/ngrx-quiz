import { Component } from '@angular/core';
import { UserCredentials } from '../../core';
import { Store } from '@ngrx/store';
import { AppState, ActionLogin, selectAuthError } from '../../store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    authError$: Observable<string>;
    credentials: UserCredentials = {
        login: '',
        password: ''
    };

    constructor(private appStore: Store<AppState>) {
        this.authError$ = this.appStore.select(selectAuthError);
    }

    login() {
        this.appStore.dispatch(new ActionLogin({ credentials: this.credentials }));
    }
}
