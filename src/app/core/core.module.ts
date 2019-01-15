import { NgModule, ErrorHandler } from '@angular/core';
import { QuizDataSource } from './datasource/quiz-data-source.service';
import { QuizService } from './services/quiz.service';
import { BASE_URL_TOKEN } from './tokens';
import { MessageService } from './services/message.service';
import { CustomErrorHandler } from './services/custom-error-handler';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        QuizDataSource, QuizService, MessageService, {
            provide: BASE_URL_TOKEN,
            useValue: 'http://localhost:3333'
        }, {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        }
    ]
})
export class CoreModule {
}
