import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './api/api.service';
import { QuizService } from './services/quiz.service';
import { MessageService } from './services/message.service';
import { CustomErrorHandler } from './services/custom-error-handler';
import { HttpErrorInterceptor } from './services/http-error-interceptor';

@NgModule({
    declarations: [],
    imports: [],
    providers: [
        ApiService, QuizService, MessageService,
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
}
