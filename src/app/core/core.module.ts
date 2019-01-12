import { NgModule, InjectionToken, ErrorHandler } from '@angular/core';
import { QuizDataSource } from './datasource/quiz-data-source.service';
import { AuthDataSource } from './datasource/auth-data-source.service';
import { QuizService } from './services/quiz.service';
import { AuthService } from './services/auth.service';
import { BASE_URL } from './tokens';
import { MessageService } from './services/message.service';
import { CustomErrorHandler } from './services/custom-error-handler';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        QuizDataSource, QuizService, AuthDataSource, AuthService, MessageService, {
            provide: BASE_URL,
            useValue: 'http://localhost:3333'
        }, {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        }
    ]
})
export class CoreModule {
}
