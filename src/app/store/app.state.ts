import { createFeatureSelector } from '@ngrx/store';
import { QuizState, QuizStateNormalized } from './quiz/quiz.state';
import { AuthState } from './auth/auth.state';
import { TokenState } from './token/token.state';

export interface AppState {
    quiz: QuizStateNormalized;
    auth: AuthState;
    token: TokenState;
}

export const selectQuizStateNormalized = createFeatureSelector<QuizStateNormalized>('quiz');
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectTokenState = createFeatureSelector<TokenState>('token');
