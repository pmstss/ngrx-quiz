/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { createSelector } from '@ngrx/store';
import { AppState, selectTokenState } from '../app.state';
import { TokenState } from './token.state';

export const selectToken = createSelector<AppState, TokenState, string>(
    selectTokenState,
    (state: TokenState) => state && state.token
);
