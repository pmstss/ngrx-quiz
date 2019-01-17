import { NgModule, ErrorHandler } from '@angular/core';
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
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        }
    ]
})
export class CoreModule {
}
