/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { User } from 'ngrx-quiz-common';

export interface AuthState {
    user: User;
}

export const initialAuthState: AuthState = {
    user: null
};
