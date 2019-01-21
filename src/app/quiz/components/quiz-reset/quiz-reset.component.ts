import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, filter } from 'rxjs/operators';
import { QuizId } from '../../../core';
import { AppState, selectQuizState, QuizState, ActionResetQuiz, QuizActionTypes } from '../../../store';
import { combineLatest } from 'rxjs';
import { Actions } from '@ngrx/effects';

@Component({
    selector: 'app-quiz-reset',
    template: '',
    styleUrls: []
})
export class QuizResetComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router,
                private appStore: Store<AppState>, private actions$: Actions) { }

    ngOnInit() {
        combineLatest(
            this.appStore.select(selectQuizState),
            this.route.params.pipe(
                map(params => params.name)
            )
        ).pipe(
            take(1)
        ).subscribe(([state, quizName]: [QuizState, string]) => {
            if (!state.finished) {
                return;
            }

            this.appStore.dispatch(new ActionResetQuiz({ quizName }));
            this.actions$.pipe(
                filter(action => action.type === QuizActionTypes.RESET_QUIZ_SUCCESS),
                take(1)
            ).subscribe(() => this.router.navigateByUrl(`/quiz/${state.quizName}`));
        });
    }
}
