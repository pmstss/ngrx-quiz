import { createSelector } from '@ngrx/store';
import { AppState, selectTokenState } from '../app.state';
import { TokenState } from './token.state';

export const selectToken = createSelector<AppState, TokenState, string>(
    selectTokenState,
    (state: TokenState) => state && state.token
);
