/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Action } from '@ngrx/store';
import { ActionTokenChanged, TokenActionTypes } from './token.actions';
import { initialTokenState, TokenState } from './token.state';

export function tokenReducer(tokenState = initialTokenState, action: Action): TokenState {
    switch (action.type) {
        case TokenActionTypes.TOKEN_CHANGED:
            return {
                ...tokenState,
                token: (action as ActionTokenChanged).payload.token,
                payload: (action as ActionTokenChanged).payload.tokenPayload
            };
    }

    return tokenState;
}
