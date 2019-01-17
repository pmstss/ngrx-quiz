import { createSelector } from '@ngrx/store';
import { AppState, selectTokenState } from '../app.state';
import { User } from '../../core';
import { TokenState } from './token.state';

export const selectToken = createSelector<AppState, TokenState, string>(
    selectTokenState,
    (state: TokenState) => state && state.token
);
