import { Action } from '@ngrx/store';
import { User } from '../../core';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGOUT = '[Auth] Logout'
}

export class ActionLogin implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: { user: User }) {}
}

export class ActionLogout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
    constructor(public payload: any = null) {}
}
