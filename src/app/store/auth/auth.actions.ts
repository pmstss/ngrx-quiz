import { Action } from '@ngrx/store';
import { UserCredentials, User } from '../../core';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_ERROR = '[Auth] Login Error',
    REGISTER = '[Auth] Register',
    REGISTER_SUCCESS = '[Auth] Register Success',
    REGISTER_ERROR = '[Auth] Register Error'
}

export class ActionLogin implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: { credentials: UserCredentials }) {}
}

export class ActionLoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: { user: User; }) {}
}

export class ActionLoginError implements Action {
    readonly type = AuthActionTypes.LOGIN_ERROR;
    constructor(public payload: any) {}
}

export class ActionRegister implements Action {
    readonly type = AuthActionTypes.REGISTER;
    constructor(public payload: { user: User & UserCredentials; }) {}
}

export class ActionRegisterSuccess implements Action {
    readonly type = AuthActionTypes.REGISTER_SUCCESS;
    constructor(public payload: { user: User; }) {}
}

export class ActionRegisterError implements Action {
    readonly type = AuthActionTypes.REGISTER_ERROR;
    constructor(public payload: any) {}
}
