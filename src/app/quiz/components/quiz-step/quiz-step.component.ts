import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
    AppState, ActionSubmitAnswer, ActionToggleChoice, ActionLoadItem,
    QuizState, selectQuizState, QuizItemStatus, selectActiveItemStatus, selectQuizId, selectQuizActiveItemId
} from '../../../store';
import { AutoUnsubscribe, QuizService, Comment } from '../../../core';

@Component({
    selector: 'app-quiz-step',
    templateUrl: './quiz-step.component.html',
    styleUrls: ['./quiz-step.component.scss']
})
export class QuizStepComponent implements OnInit {
    @AutoUnsubscribe private routeSubscription: Subscription;
    quizState$: Observable<QuizState>;
    itemState$: Observable<QuizItemStatus>;

    private commentsSubject = new BehaviorSubject<Comment[]>([]);
    comments$ = this.commentsSubject.asObservable();
    commentsExpanded = false;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>, private quizService: QuizService) {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.itemState$ = this.appStore.select(selectActiveItemStatus).pipe(filter(v => !!v));
    }

    ngOnInit() {
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
    }

    submit() {
        this.appStore.dispatch(new ActionSubmitAnswer());
    }

    toggleChoice(choiceId: string): void {
        this.appStore.dispatch(new ActionToggleChoice({ choiceId }));
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
        this.itemState$.pipe(
            take(1),
            switchMap(state => this.quizService.postComment(state.id, text))
        ).subscribe((res) => {
            const comments = [res].concat(this.commentsSubject.value);
            this.commentsSubject.next(comments);
        });
    }
}
