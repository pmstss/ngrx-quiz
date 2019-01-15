import { Action } from '@ngrx/store';

export enum TokenActionTypes {
    TOKEN_CHANGED = '[Token] Changed'
}

export class ActionTokenChanged implements Action {
    readonly type = TokenActionTypes.TOKEN_CHANGED;
    constructor(public payload: { token: string; tokenPayload: any }) {}
}
