/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Action } from '@ngrx/store';

export enum TokenActionTypes {
    TOKEN_CHANGED = '[Token] Changed'
}

export class ActionTokenChanged implements Action {
    readonly type = TokenActionTypes.TOKEN_CHANGED;
    constructor(public payload: { token: string; tokenPayload: any }) {}
}
