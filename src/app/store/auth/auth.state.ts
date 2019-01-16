import { User } from '../../core';

export interface AuthState {
    user: User;
}

export const initialAuthState: AuthState = {
    user: null
};
