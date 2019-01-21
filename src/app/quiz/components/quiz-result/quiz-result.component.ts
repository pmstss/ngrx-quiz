import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectQuizState, QuizState, ActionResetQuiz } from '../../../store';

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html'
})
export class QuizResultComponent implements OnInit {
    quizState$: Observable<QuizState>;

    constructor(private appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState);
    }

    reset() {
        this.appStore.dispatch(new ActionResetQuiz({}));
    }
}
