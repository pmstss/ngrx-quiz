import { createSelector } from '@ngrx/store';
import { User } from 'ngrx-quiz-common';
import { AppState, selectAuthState } from '../app.state';
import { AuthState } from './auth.state';

export const selectUser = createSelector<AppState, AuthState, User>(
    selectAuthState,
    (state: AuthState) => state && state.user
);
