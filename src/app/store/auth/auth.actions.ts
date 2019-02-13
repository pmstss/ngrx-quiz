/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Action } from '@ngrx/store';
import { User } from 'ngrx-quiz-common';

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
