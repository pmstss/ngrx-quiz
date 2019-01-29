import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, keyframes, useAnimation } from '@angular/animations';
import { Subscription, combineLatest, Observable, of, BehaviorSubject, from } from 'rxjs';
import { map, filter, take, switchMap, delay, concatMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { bounceInLeft, fadeIn } from 'ng-animate';
import { Comment } from 'ngrx-quiz-common';
import {
    AppState, QuizState, QuizItemStatus, QuizItemChoiceStatus,
    ActionSubmitAnswer, ActionLoadItem,
    selectQuizState, selectActiveItemStatus, selectQuizId, selectQuizActiveItemId
} from '../../../store';
import { AutoUnsubscribe, QuizService } from '../../../core';

const DELAY_CHOICES_QUEUE = 150;

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
    animations: [
        trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
            params: { timing: 0.6, delay: 0 }
        }))]),
        trigger('bounceInLeft', [transition(':enter', useAnimation(bounceInLeft, {
            params: { timing: 0.5, delay: 0, a: '-80%' }
        }))]),
        // trigger('zoomInLeft', [transition('* => *', useAnimation(zoomInLeft))]),
        // trigger('flipInX', [transition('* => *', useAnimation(flipInX))]),
        trigger('flyInAnimation', [
            transition(':enter', [
                style({
                    transform: 'translate3d(-100%, 0, 0)'
                }),
                animate('0.5s ease-out', keyframes([
                    style({
                        transform: 'translate3d(0, 0, 0)',
                        offset: 1
                    })
                ]))
            ])
        ])
    ]
})
export class QuizStepComponent implements OnInit {
    @AutoUnsubscribe private routeSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemStatus$: Observable<QuizItemStatus>;
    choices$: Observable<QuizItemChoiceStatus[]>;

    flyCounter: number = 0;

    private commentsSubject = new BehaviorSubject<Comment[]>([]);
    comments$ = this.commentsSubject.asObservable();
    commentsExpanded = false;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>, private quizService: QuizService) {
    }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemStatus$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));

        this.routeSubscription = combineLatest(
            this.appStore.select(selectQuizId),
            this.route.params.pipe(
                map(params => +params.step)
            )
        ).pipe(
            filter(([quizId, step]) => !!(quizId && step))
        ).subscribe(
            ([quizId, step]) => this.appStore.dispatch(new ActionLoadItem({ step, quizId }))
        );

        this.choices$ = this.itemStatus$.pipe(
            map(status => status.choicesStatus),
            distinctUntilChanged(
                (ch1, ch2) => ch1.length === ch2.length && ch1.every((ch, idx) => ch.id === ch2[idx].id)
            ),
            tap(() => this.flyCounter = 0),
            switchMap((choices: QuizItemChoiceStatus[]) =>
                from(choices.map((ch, idx) => choices.slice(0, idx + 1)))
                    .pipe(concatMap(ch => of(ch).pipe(delay(DELAY_CHOICES_QUEUE))))
            )
        );
    }

    submit() {
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    loadComments() {
        this.commentsExpanded = true;
        this.appStore.select(selectQuizActiveItemId).pipe(
            switchMap(id => this.quizService.loadComments(id))
        ).subscribe((comments) => {
            this.commentsSubject.next(comments);
        });
    }

    addComment({ text }: {text: string}) {
        this.itemStatus$.pipe(
            take(1),
            switchMap(state => this.quizService.postComment(state.id, text))
        ).subscribe((res) => {
            const comments = [res].concat(this.commentsSubject.value);
            this.commentsSubject.next(comments);
        });
    }

    animationDone(event: any) {
        if (event.fromState === 'void') {
            this.flyCounter++;
        }
    }

    trackChoice(index: number, obj: any) {
        return obj.id;
    }
}
