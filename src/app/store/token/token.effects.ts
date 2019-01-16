import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TokenActionTypes, ActionTokenChanged } from './token.actions';
import { ActionLogin, ActionLogout } from '../auth/auth.actions';

@Injectable()
export class TokenEffects {
    constructor(private actions$: Actions) { }

    @Effect()
    tokenChanged$ = this.actions$.pipe(
        ofType(TokenActionTypes.TOKEN_CHANGED),
        map((action: ActionTokenChanged) => {
            return action.payload.token ?
                new ActionLogin({ user: (action.payload as any).tokenPayload.user }) : new ActionLogout();
        })
    );
}
