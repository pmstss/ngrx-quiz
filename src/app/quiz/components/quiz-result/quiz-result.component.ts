import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectQuizState, QuizState } from '../../../store';

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html'
})
export class QuizResultComponent {
    quizState$: Observable<QuizState>;

    constructor(private appStore: Store<AppState>) {
        this.quizState$ = this.appStore.select(selectQuizState);
    }
}
