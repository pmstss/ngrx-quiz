import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, filter, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from '../../../core';
import { AppState, ActionLoadQuiz, QuizState, selectQuizState, ActionResetQuiz } from '../../../store';

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizIntroComponent implements OnInit {
    quizState$: Observable<QuizState>;
    @AutoUnsubscribe routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.routeSubscription = this.route.params.pipe(
            map(params => params.name),
            distinctUntilChanged()
        ).subscribe(
            (quizName: string) => this.appStore.dispatch(new ActionLoadQuiz({ quizName }))
        );

        this.quizState$ = this.appStore.select(selectQuizState).pipe(
            filter((quizState: QuizState) => quizState.itemIds && quizState.itemIds.length > 0),
            debounceTime(1000)
        );
    }

    reset() {
        this.appStore.dispatch(new ActionResetQuiz({}));
    }
}
