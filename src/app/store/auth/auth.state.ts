import { User } from '../../auth';

export interface AuthState {
    user: User;
}

export const initialAuthState: AuthState = {
    user: null
};
