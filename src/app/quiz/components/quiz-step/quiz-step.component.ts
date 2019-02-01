import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { Subscription, Observable, of, from } from 'rxjs';
import { map, filter, switchMap, delay, concatMap, tap, distinctUntilChanged, share } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fadeIn } from 'ng-animate';
import { bounceInLeft } from './animations';
import {
    AppState, QuizState, QuizItemStatus, QuizItemChoiceStatus, ActionSubmitAnswer, ActionLoadItem,
    selectQuizState, selectActiveItemStatus } from '../../../store';
import { AutoUnsubscribe } from '../../../core';

const DELAY_CHOICES_QUEUE = 150;

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animCard', [
            transition('* => *', useAnimation(fadeIn, {
                params: { timing: 1, delay: 0 }
            }))
        ]),
        trigger('animChoice', [
            state('void', style({
                transform: 'translate3d(-110%, 0, 0)'
            })),
            transition('void => in', useAnimation(bounceInLeft, {
                params: { timing: 1.5, delay: 0.4, a: '-110%' }
            }))
        ])
    ]
})
export class QuizStepComponent implements OnInit {
    @AutoUnsubscribe private routeSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemStatus$: Observable<QuizItemStatus>;
    choices$: Observable<QuizItemChoiceStatus[]>;

    choicesAnimationCounter: number = 0;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemStatus$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));

        this.routeSubscription = this.route.params.pipe(
            map((params: Params) => +params.step),
            filter(step => !!step)
        ).subscribe((step: number) => {
            this.appStore.dispatch(new ActionLoadItem({ step }));
        });

        this.choices$ = this.initAnimatedChoicesObservable();
    }

    private initAnimatedChoicesObservable() {
        // transform choicesStatus array observable into sequence of growing arrays for
        // choices one by one appearing animation (in combination with proper trackBy)
        return this.itemStatus$.pipe(
            map(status => status.choicesStatus),
            distinctUntilChanged(
                (ch1, ch2) => ch1.length === ch2.length && ch1.every((ch, idx) => ch.id === ch2[idx].id)
            ),
            tap(() => this.choicesAnimationCounter = 0),
            switchMap((choices: QuizItemChoiceStatus[]) =>
                from(choices.map((ch, idx) => choices.slice(0, idx + 1)))
                    .pipe(concatMap(ch => of(ch).pipe(delay(DELAY_CHOICES_QUEUE))))
            )
        );
    }

    submit() {
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    choiceAnimationDone(event: any) {
        if (event.fromState === 'void' && event.toState === 'in') {
            this.choicesAnimationCounter++;
        }
    }

    trackChoice(index: number, obj: any) {
        return obj.id;
    }
}
