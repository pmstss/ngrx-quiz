import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, ActionLogin } from './auth.actions';
import { MessageService } from '../../core';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private messageService: MessageService) { }

    @Effect({ dispatch: false })
    resetQuizSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        tap((action: ActionLogin) => {
            const userName = action.payload.user.fullName;
            this.messageService.success(`Hello, ${userName}!`, 'Success Login');
        })
    );

}
