/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import { metaReducers, reducers } from './app.reducers';
import { QuizEffects } from './quiz/quiz.effects';
import { TokenEffects } from './token/token.effects';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([QuizEffects, TokenEffects, AuthEffects])
    ],
    providers: [],
    bootstrap: []
})
export class AppStoreModule {
}
