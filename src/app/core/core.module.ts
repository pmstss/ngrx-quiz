import { NgModule, InjectionToken } from '@angular/core';
import { QuizDataSource } from './datasource/quiz-data-source.service';
import { AuthDataSource } from './datasource/auth-data-source.service';
import { QuizService } from './services/quiz.service';
import { AuthService } from './services/auth.service';
import { BASE_URL } from './tokens';

@NgModule({
    declarations: [],
    imports: [],
    providers: [QuizDataSource, QuizService, AuthDataSource, AuthService, {
        provide: BASE_URL,
        useValue: 'http://localhost:3333'
    }]
})
export class CoreModule {
}
