/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { Subscription, Observable, of, from, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, delay, concatMap, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fadeIn, fadeOut } from 'ng-animate';
import { bounceInLeft } from './animations';
import { AppState, QuizState, QuizItemStatus, QuizItemChoiceStatus, ActionSubmitAnswer, ActionLoadItem,
    selectQuizState, selectActiveItemStatus, selectQuizStep, selectQuizActiveItem } from '../../../store';
import { AutoUnsubscribe } from '../../../core';

const DELAY_CHOICES_QUEUE = 200;
const FADE_OUT_DURATION = 400;
const DELAY_ITEM_LOAD_MIN = FADE_OUT_DURATION * 1.2;

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animCard', [
            state('void', style({
                opacity: 0
            })),
            transition('void => in', useAnimation(fadeIn, {
                params: { timing: 0.6, delay: 0 }
            })),
            transition('in => void', useAnimation(fadeOut, {
                params: { timing: FADE_OUT_DURATION / 1000, delay: 0 }
            }))
        ]),
        trigger('animChoice', [
            state('void', style({
                transform: 'translate3d(-110%, 0, 0)'
            })),
            transition('void => in', useAnimation(bounceInLeft, {
                params: { timing: 1.5, delay: 0, a: '-110%' }
            }))
        ])
    ]
})
export class QuizStepComponent implements OnInit {
    @AutoUnsubscribe private routeSubscription: Subscription;
    @AutoUnsubscribe private quizStepSubscription: Subscription;
    @AutoUnsubscribe private activeItemSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemLoading$ = new BehaviorSubject<boolean>(true);
    itemStatus$: Observable<QuizItemStatus>;
    private itemStatusAux$: Observable<QuizItemStatus>;
    choices$: Observable<QuizItemChoiceStatus[]>;

    submitted: boolean = false;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState).pipe(debounceTime(FADE_OUT_DURATION));

        this.routeSubscription = this.route.params.pipe(
            map((params: Params) => +params.step),
            filter(step => !!step)
        ).subscribe((step: number) => {
            this.appStore.dispatch(new ActionLoadItem({ step }));
        });

        this.quizStepSubscription = this.appStore.select(selectQuizStep).subscribe(() => {
            this.itemLoading$.next(true);
            this.submitted = false;
        });

        this.activeItemSubscription = this.appStore.select(selectQuizActiveItem).pipe(
            filter(x => !!x),
            // debouncing item loading to have time for fadeOut card animation
            debounceTime(DELAY_ITEM_LOAD_MIN)
        ).subscribe(() => {
            this.itemLoading$.next(false);
        });

        // with nulls - to reset choices
        this.itemStatusAux$ = this.itemLoading$.pipe(
            switchMap(loading => loading ? of(null) : this.appStore.select(selectActiveItemStatus))
        );

        // changes itemStatus only on end of loading (i. e. does not keep "nulls" during loading)
        this.itemStatus$ = this.itemStatusAux$.pipe(filter(x => !!x));

        this.choices$ = this.initAnimatedChoicesObservable();
    }

    private initAnimatedChoicesObservable(): Observable<QuizItemChoiceStatus[]> {
        // transform choicesStatus array observable into sequence of growing arrays for
        // choices one by one appearing animation (in combination with proper trackBy)

        let prevChoices: QuizItemChoiceStatus[] = [];
        return this.itemStatusAux$.pipe(
            map(status => status ? status.choicesStatus : []),
            switchMap((choices: QuizItemChoiceStatus[]) => {
                if (JSON.stringify(choices) === JSON.stringify(prevChoices)) {
                    return of(choices);
                }

                let result: Observable<QuizItemChoiceStatus[]>;
                if (choices.length === 0) {
                    result = of([]);
                } else if (choices.length !== prevChoices.length ||
                        !choices.every((ch, idx) => ch.id === prevChoices[idx].id)) {
                    result = from(choices.map((ch, idx) => choices.slice(0, idx + 1)))
                        .pipe(concatMap(ch => of(ch).pipe(delay(DELAY_CHOICES_QUEUE))));
                } else {
                    result = of(choices);
                }

                prevChoices = choices;
                return result;
            })
        );
    }

    submit() {
        this.submitted = true;
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    trackChoice(idx: number, obj: any) {
        return obj.id;
    }
}
