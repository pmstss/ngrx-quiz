import { Action } from '@ngrx/store';
import { initialAuthState, AuthState } from './auth.state';
import {
    AuthActionTypes, ActionLoginSuccess, ActionRegisterSuccess,
    ActionRegisterError, ActionLoginError
} from './auth.actions';

export function authReducer(authState = initialAuthState, action: Action): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
        case AuthActionTypes.REGISTER:
            return {
                ...authState,
                errorMessage: null
            };

        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...authState,
                errorMessage: null,
                user: (<ActionLoginSuccess>action).payload.user
            };

        case AuthActionTypes.LOGIN_ERROR:
            return {
                ...authState,
                errorMessage: (<ActionLoginError>action).payload,
                user: null
            };

        case AuthActionTypes.REGISTER_SUCCESS:
            return {
                ...authState,
                user: (<ActionRegisterSuccess>action).payload.user
            };

        case AuthActionTypes.REGISTER_ERROR:
            return {
                ...authState,
                errorMessage: (<ActionRegisterError>action).payload,
                user: null
            };
    }

    return authState;
}
