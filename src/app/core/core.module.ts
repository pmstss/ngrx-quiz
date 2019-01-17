import { NgModule, ErrorHandler } from '@angular/core';
import { BASE_URL_TOKEN } from './tokens';
import { ApiService } from './api/api.service';
import { QuizService } from './services/quiz.service';
import { MessageService } from './services/message.service';
import { CustomErrorHandler } from './services/custom-error-handler';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        ApiService, QuizService, MessageService,
        {
            provide: BASE_URL_TOKEN,
            useValue: 'http://localhost:3333'
        },
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        }
    ]
})
export class CoreModule {
}
