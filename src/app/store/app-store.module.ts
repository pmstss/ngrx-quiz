import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import { metaReducers, reducers } from './app.reducers';
import { AuthEffects } from './auth/auth.effects';
import { AppEffects } from './quiz/quiz.effects';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects, AuthEffects])
    ],
    providers: [],
    bootstrap: []
})
export class AppStoreModule {
}
