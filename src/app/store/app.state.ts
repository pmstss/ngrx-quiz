import { createFeatureSelector } from '@ngrx/store';
import { QuizState } from './quiz/quiz.state';
import { AuthState } from './auth/auth.state';
import { TokenState } from './token/token.state';

export interface AppState {
    quiz: QuizState;
    auth: AuthState;
    token: TokenState;
}

export const selectQuizState = createFeatureSelector<QuizState>('quiz');
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectTokenState = createFeatureSelector<AuthState>('token');
