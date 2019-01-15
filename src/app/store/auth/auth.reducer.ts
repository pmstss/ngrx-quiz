import { Action } from '@ngrx/store';
import { initialAuthState, AuthState } from './auth.state';
import { AuthActionTypes, ActionLogin } from './auth.actions';

export function authReducer(authState = initialAuthState, action: Action): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...authState,
                user: { ...(action as ActionLogin).payload.user }
            };

        case AuthActionTypes.LOGOUT:
            return {
                ...authState,
                user: null
            };
    }

    return authState;
}
