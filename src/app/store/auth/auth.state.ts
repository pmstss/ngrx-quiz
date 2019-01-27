import { User } from 'ngrx-quiz-common';

export interface AuthState {
    user: User;
}

export const initialAuthState: AuthState = {
    user: null
};
