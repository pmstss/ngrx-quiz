import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, Observable, of } from 'rxjs';
import { map, distinctUntilChanged, filter, tap, skipUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
    AppState, ActionSubmitAnswer, ActionToggleChoice, ActionLoadItem,
    selectQuizId, QuizState, selectQuizState, QuizItemStatus, selectActiveItemStatus, selectQuizMeta
} from '../../store';
import { AutoUnsubscribe } from '../../core';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    @AutoUnsubscribe private itemStateSubscription: Subscription;
    @AutoUnsubscribe private routeSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemState$: Observable<QuizItemStatus>;
    question: string;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>) {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemState$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));

        this.itemStateSubscription = this.itemState$.subscribe(
            itemState => this.question = itemState && itemState.question || ''
        );
    }

    ngOnInit() {
        this.routeSubscription = combineLatest(
            this.appStore.select(selectQuizMeta),
            this.route.params.pipe(
                map(params => +params.step)
            )
        ).pipe(
            filter(([quizMeta, step]) => !!(quizMeta && step))
        ).subscribe(
            ([quizMeta, step]) => this.appStore.dispatch(new ActionLoadItem({ step, quizId: quizMeta.id }))
        );
    }

    submit() {
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    getNextStep(): Observable<number> {
        return this.quizState$.pipe(
            filter(state => !!state.quizMeta),
            map((state) => {
                if (state.finished) {
                    return 0;
                }
                const total = state.quizMeta.totalQuestions;
                for (let step = state.step, idx = step; idx < step + total; ++idx) {
                    console.log(step, idx);
                    if (!state.isAnswered(idx % total + 1)) {
                        return idx % total + 1;
                    }
                }
                return 1;
            })
        );
    }

    toggleChoice(choiceId: string): void {
        this.appStore.dispatch(new ActionToggleChoice({ choiceId }));
    }
}
