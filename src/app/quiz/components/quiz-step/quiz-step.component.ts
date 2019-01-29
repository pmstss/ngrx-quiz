import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Subscription, Observable, of, BehaviorSubject, from } from 'rxjs';
import { map, filter, switchMap, delay, concatMap, tap, distinctUntilChanged, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { bounceInLeft, fadeIn } from 'ng-animate';
import { Comment } from 'ngrx-quiz-common';
import {
    AppState, QuizState, QuizItemStatus, QuizItemChoiceStatus,
    ActionSubmitAnswer, ActionLoadItem, ActionPostItemComment,
    selectQuizState, selectActiveItemStatus, selectItemComments, ActionLoadItemComments
} from '../../../store';
import { AutoUnsubscribe, QuizService } from '../../../core';
import { DialogService } from '../../../dialog';

const DELAY_CHOICES_QUEUE = 150;

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animCard', [transition('* => *', useAnimation(fadeIn, {
            params: { timing: 0.6, delay: 0 }
        }))]),
        trigger('animChoice', [transition(':enter', useAnimation(bounceInLeft, {
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

    itemComments$: Observable<Comment[]>;
    comments$: Observable<Comment[]>;
    private commentsExpanded = new BehaviorSubject<boolean>(false);
    commentsExpanded$: Observable<boolean> = this.commentsExpanded.asObservable();
    commentsEditor = false;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemStatus$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));
        this.itemComments$ = this.appStore.select(selectItemComments);

        this.routeSubscription = this.route.params.pipe(
            map((params: Params) => +params.step),
            filter(step => !!step)
        ).subscribe((step: number) => {
            this.commentsExpanded.next(false);
            this.appStore.dispatch(new ActionLoadItem({ step }));
        });

        this.choices$ = this.initAnimatedChoicesObservable();
        this.comments$ = this.initCommentsObservable();
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

    private initCommentsObservable() {
        return this.commentsExpanded$.pipe(
            switchMap(expanded => !expanded ? of([]) : this.itemStatus$.pipe(
                first(),
                map(itemStatus => itemStatus.answered),
                filter((answered) => {
                    if (!answered) {
                        this.commentsExpanded.next(false);
                        this.showAnswerFirstDialog();
                        return false;
                    }
                    return true;
                }),
                switchMap(() => this.itemComments$.pipe(filter(x => !!x), first()))
            ))
        );
    }

    private showAnswerFirstDialog() {
        this.dialogService.alert({
            title: 'Information',
            message: 'Please answer first to see comments'
        });
    }

    submit() {
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    showComments() {
        this.appStore.dispatch(new ActionLoadItemComments());
        this.commentsExpanded.next(true);
    }

    hideComments() {
        this.commentsExpanded.next(false);
    }

    addComment({ text }: {text: string}) {
        this.appStore.dispatch(new ActionPostItemComment({ text }));
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
