import { createFeatureSelector } from '@ngrx/store';
import { QuizState } from './quiz/quiz.state';
import { AuthState } from './auth/auth.state';

export interface AppState {
    quiz: QuizState;
    auth: AuthState;
}

export const selectQuizState = createFeatureSelector<QuizState>('quiz');
export const selectAuthState = createFeatureSelector<AuthState>('auth');
