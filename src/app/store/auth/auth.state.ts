import { User } from '../../core';

export interface AuthState {
    user: User;
    errorMessage: string;
}

export const initialAuthState: AuthState = {
    user: null,
    errorMessage: null
};
