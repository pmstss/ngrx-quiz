import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core';
import {
    AuthActionTypes, ActionLogin, ActionLoginSuccess,
    ActionLoginError, ActionRegister, ActionRegisterSuccess
} from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
    }

    @Effect()
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        switchMap((action: Action) => {
            const payload = (<ActionLogin>action).payload;
            return this.authService.login(payload.credentials).pipe(
                map((user) => {
                    this.router.navigateByUrl('/quizes');
                    return new ActionLoginSuccess({ user });
                }),
                catchError(error => of(new ActionLoginError(error)))
            );
        })
    );

    @Effect()
    register$ = this.actions$.pipe(
        ofType(AuthActionTypes.REGISTER),
        switchMap((action: Action) => {
            return this.authService.register((<ActionRegister>action).payload.user).pipe(
                map(user => new ActionRegisterSuccess({ user })),
                catchError(error => of(new ActionLoginError(error)))
            );
        })
    );
}
