import { Component } from '@angular/core';
import { selectQuizState, AppState, QuizState } from './store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MessageService } from './core/services/message.service';
import { NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    quizState$: Observable<QuizState>;

    constructor(private appStore: Store<AppState>, private messageService: MessageService,
                private toastrService: NbToastrService) {
        this.quizState$ = appStore.select(selectQuizState);

        messageService.messages$.subscribe((msg) => {
            this.toastrService.show(msg.message, msg.title, {
                status: msg.status,
                duration: msg.duration
            });
        });
    }
}
