import { createSelector } from '@ngrx/store';
import { AppState, selectAuthState } from '../app.state';
import { AuthState } from './auth.state';
import { User } from '../../core';

export const selectUser = createSelector<AppState, AuthState, User>(
    selectAuthState,
    (state: AuthState) => state && state.user
);
