import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { Subscription, Observable, of, from, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap, delay, concatMap, distinctUntilChanged,
    debounceTime, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fadeIn, fadeOut } from 'ng-animate';
import { bounceInLeft } from './animations';
import { AppState, QuizState, QuizItemStatus, QuizItemChoiceStatus, ActionSubmitAnswer, ActionLoadItem,
    selectQuizState, selectActiveItemStatus, selectQuizStep, selectQuizActiveItem } from '../../../store';
import { AutoUnsubscribe } from '../../../core';

const DELAY_CHOICES_QUEUE = 200;
const FADE_OUT_DURATION = 400;
const DELAY_ITEM_LOAD_MIN = FADE_OUT_DURATION * 0.9;

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
    itemStatusDelayed$: Observable<QuizItemStatus>;
    choices$: Observable<QuizItemChoiceStatus[]>;

    choicesAnimationCounter: number = 0;
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
            this.choicesAnimationCounter = 0;
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

        // changes itemStatus only on end of loading (i. e. does not keep "nulls" during loading)
        this.itemStatusDelayed$ = this.itemLoading$.pipe(
            filter(x => !x),
            switchMap(() => this.appStore.select(selectActiveItemStatus).pipe(
                filter(x => !!x),
                take(1)
            ))
        );

        this.itemStatus$ = this.itemLoading$.pipe(
            filter(x => !x),
            switchMap(() => this.appStore.select(selectActiveItemStatus)),
            filter(x => !!x)
        );

        this.choices$ = this.initAnimatedChoicesObservable();
    }

    private initAnimatedChoicesObservable() {
        // transform choicesStatus array observable into sequence of growing arrays for
        // choices one by one appearing animation (in combination with proper trackBy)
        return this.itemStatus$.pipe(
            map(status => status ? status.choicesStatus : []),
            distinctUntilChanged(
                (ch1, ch2) => ch1.length === ch2.length && ch1.every((ch, idx) => ch.id === ch2[idx].id)
            ),
            switchMap((choices: QuizItemChoiceStatus[]) => choices.length === 0 ? of([]) :
                from(choices.map((ch, idx) => choices.slice(0, idx + 1)))
                    .pipe(concatMap(ch => of(ch).pipe(delay(DELAY_CHOICES_QUEUE))))
            )
        );
    }

    submit() {
        this.submitted = true;
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
