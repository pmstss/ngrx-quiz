import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { trigger, useAnimation, transition } from '@angular/animations';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Comment } from 'ngrx-quiz-common';
import { fadeIn } from 'ng-animate';
import { AppState, selectItemComments, selectActiveItemAnswered,
    ActionLoadItemComments, ActionPostItemComment, selectQuizStep } from '../../../store';
import { switchMap, first, filter } from 'rxjs/operators';
import { DialogService } from 'src/app/dialog';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animComment', [transition(':enter', useAnimation(fadeIn))])
    ]
})
export class CommentsComponent implements OnInit {
    @Input() title: string = 'Comments';
    @Input() numberOfComments: number = 0;

    private stepSubscription: Subscription;
    private itemAnswered$: Observable<boolean>;
    private itemComments$: Observable<Comment[]>;
    private commentsExpanded = new BehaviorSubject<boolean>(false);

    commentsExpanded$: Observable<boolean> = this.commentsExpanded.asObservable();
    comments$: Observable<Comment[]>;
    commentsEditor = false;

    constructor(private appStore: Store<AppState>, private dialogService: DialogService) {
    }

    ngOnInit() {
        this.stepSubscription = this.appStore.select(selectQuizStep)
            .subscribe(() => this.commentsExpanded.next(false));

        this.itemComments$ = this.appStore.select(selectItemComments);
        this.itemAnswered$ = this.appStore.select(selectActiveItemAnswered);

        this.comments$ = this.initCommentsObservable();
    }

    private initCommentsObservable(): Observable<Comment[]> {
        return this.commentsExpanded$.pipe(
            switchMap(expanded => !expanded ? of([]) : this.itemAnswered$.pipe(
                first(),
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

    showComments() {
        this.appStore.dispatch(new ActionLoadItemComments());
        this.commentsExpanded.next(true);
    }

    hideComments() {
        this.commentsExpanded.next(false);
    }

    onMessage(message) {
        this.appStore.dispatch(new ActionPostItemComment({ text: message }));
    }
}
