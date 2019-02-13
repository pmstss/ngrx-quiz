/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { createSelector } from '@ngrx/store';
import { User } from 'ngrx-quiz-common';
import { AppState, selectAuthState } from '../app.state';
import { AuthState } from './auth.state';

export const selectUser = createSelector<AppState, AuthState, User>(
    selectAuthState,
    (state: AuthState) => state && state.user
);
