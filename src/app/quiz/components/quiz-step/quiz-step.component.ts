import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
    AppState, ActionSubmitAnswer, ActionToggleChoice, ActionLoadItem,
    QuizState, selectQuizState, QuizItemStatus, selectActiveItemStatus, selectQuizMeta
} from '../../../store';
import { AutoUnsubscribe } from '../../../core';

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss']
})
export class QuizStepComponent implements OnInit {
    @AutoUnsubscribe private routeSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemState$: Observable<QuizItemStatus>;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>) {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemState$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));
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

    toggleChoice(choiceId: string): void {
        this.appStore.dispatch(new ActionToggleChoice({ choiceId }));
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
                    if (!state.isAnswered(idx % total + 1)) {
                        return idx % total + 1;
                    }
                }
                return 1;
            })
        );
    }
}
