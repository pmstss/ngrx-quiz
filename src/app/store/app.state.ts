/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { createFeatureSelector } from '@ngrx/store';
import { QuizStateNormalized } from './quiz/quiz.state';
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
