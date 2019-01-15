import { createSelector } from '@ngrx/store';
import { AppState, selectAuthState } from '../app.state';
import { AuthState } from './auth.state';

export const selectUserFullName = createSelector<AppState, AuthState, string>(
    selectAuthState,
    (state: AuthState) => state.user && state.user.fullName
);
