/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from './app.state';
import { quizReducer } from './quiz/quiz.reducer';
import { authReducer } from './auth/auth.reducer';
import { tokenReducer } from './token/token.reducer';

export const reducers: ActionReducerMap<AppState> = {
    quiz: quizReducer,
    auth: authReducer,
    token: tokenReducer
};

export function logger(reducer: ActionReducer<AppState>):
    ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('### ngrx logger - action: %o', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
