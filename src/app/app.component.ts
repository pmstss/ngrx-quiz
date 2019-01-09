import { Component } from '@angular/core';
import { selectQuizState, AppState, QuizState } from './store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    quizState$: Observable<QuizState>;

    constructor(private appStore: Store<AppState>) {
        this.quizState$ = appStore.select(selectQuizState);
    }
}
