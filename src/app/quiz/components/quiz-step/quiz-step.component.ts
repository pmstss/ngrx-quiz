import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Subscription, Observable, of, BehaviorSubject, from } from 'rxjs';
import { map, filter, take, switchMap, delay, concatMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { bounceInLeft, fadeIn } from 'ng-animate';
import { Comment } from 'ngrx-quiz-common';
import {
    AppState, QuizState, QuizItemStatus, QuizItemChoiceStatus,
    ActionSubmitAnswer, ActionLoadItem,
    selectQuizState, selectActiveItemStatus, selectQuizActiveItemId
} from '../../../store';
import { AutoUnsubscribe, QuizService } from '../../../core';
import { DialogService } from 'src/app/dialog';

const DELAY_CHOICES_QUEUE = 150;

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
            params: { timing: 0.6, delay: 0 }
        }))]),
        trigger('bounceInLeft', [transition(':enter', useAnimation(bounceInLeft, {
            params: { timing: 0.5, delay: 0, a: '-80%' }
        }))])
    ]
})
export class QuizStepComponent implements OnInit {
    @AutoUnsubscribe private routeSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemStatus$: Observable<QuizItemStatus>;
    choices$: Observable<QuizItemChoiceStatus[]>;

    choicesAnimationCounter: number = 0;

    private commentsSubject = new BehaviorSubject<Comment[]>([]);
    comments$ = this.commentsSubject.asObservable();
    commentsExpanded = false;
    commentsEditor = false;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>,
                private quizService: QuizService, private dialogService: DialogService) {
    }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemStatus$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));

        this.routeSubscription = this.route.params.pipe(
            map((params: Params) => +params.step),
            filter(step => !!step)
        ).subscribe((step: number) => {
            this.commentsExpanded = false;
            this.appStore.dispatch(new ActionLoadItem({ step }));
        });

        // transform choicesStatus array observable into sequence of growing arrays for
        // choices one by one appearing animation
        this.choices$ = this.itemStatus$.pipe(
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

        this.choices$.subscribe(x => console.log(x));
    }

    submit() {
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    loadComments() {
        if (this.commentsExpanded) {
            this.commentsExpanded = false;
            return;
        }

        this.itemStatus$.pipe(
            map(itemStatus => itemStatus.answered),
            take(1)
        ).subscribe((answered) => {
            if (!answered) {
                this.dialogService.alert({ title: 'Information', message: 'Please answer first to see comments' });
            } else {
                this.commentsExpanded = true;
                this.appStore.select(selectQuizActiveItemId).pipe(
                    switchMap(id => this.quizService.loadComments(id))
                ).subscribe(comments => this.commentsSubject.next(comments));
            }
        });
    }

    addComment({ text }: {text: string}) {
        this.itemStatus$.pipe(
            take(1),
            switchMap(state => this.quizService.postComment(state.id, text))
        ).subscribe((res) => {
            this.commentsEditor = false;
            const comments = [res].concat(this.commentsSubject.value);
            this.commentsSubject.next(comments);
        });
    }

    choiceAnimationDone(event: any) {
        if (event.fromState === 'void') {
            this.choicesAnimationCounter++;
        }
    }

    trackChoice(index: number, obj: any) {
        return obj.id;
    }
}
