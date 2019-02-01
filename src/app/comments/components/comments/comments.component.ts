import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { trigger, useAnimation, transition } from '@angular/animations';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Comment } from 'ngrx-quiz-common';
import { fadeIn } from 'ng-animate';
import { AppState, selectItemComments, selectActiveItemAnswered, selectQuizStep,
    ActionLoadItemComments, ActionLoadItemCommentsSuccess, ActionLoadItemCommentsError,
    ActionPostItemComment,
    selectItemCommentsTotal,
    selectItemCommentsLoadedSize} from '../../../store';
import { filter, map, take, switchMap, first } from 'rxjs/operators';
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

    comments$: Observable<Comment[]>;
    loadingComments$ = new BehaviorSubject<boolean>(false);
    commentsExpanded$ = new BehaviorSubject<boolean>(false);
    commentsEditor = false;

    constructor(private appStore: Store<AppState>, private actions$: Actions,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.stepSubscription = this.appStore.select(selectQuizStep)
            .subscribe(() => this.commentsExpanded$.next(false));

        this.comments$ = combineLatest(
            this.commentsExpanded$.pipe(filter(x => !!x)),
            this.appStore.select(selectItemComments)
        ).pipe(
            map(([, comments]) => comments)
        );
    }

    showComments() {
        this.appStore.select(selectActiveItemAnswered).pipe(
            take(1)
        ).subscribe((answered) => {
            if (!answered) {
                return this.dialogService.alert({
                    title: 'Information',
                    message: 'Please answer first to see comments'
                });
            }

            this.commentsExpanded$.next(true);
            this.appStore.dispatch(new ActionLoadItemComments());
        });
    }

    loadNext() {
        this.loadingComments$.pipe(
            first(),
            filter(x => !x),
            switchMap(() => combineLatest(
                this.appStore.select(selectItemCommentsLoadedSize),
                this.appStore.select(selectItemCommentsTotal)
            )),
            take(1) // TODO why first() fails sometimes, i. e. why stream is finished empty?
        ).subscribe(([loadedSize, total]: [number, number]) => {
            if (loadedSize >= total) {
                return;
            }

            this.loadingComments$.next(true);
            this.actions$.pipe(
                filter((action: Action) => action instanceof ActionLoadItemCommentsSuccess
                    || action instanceof ActionLoadItemCommentsError),
                first()
            ).subscribe(null, null, () => this.loadingComments$.next(false));

            this.appStore.dispatch(new ActionLoadItemComments());
        });
    }

    hideComments() {
        this.commentsExpanded$.next(false);
    }

    onMessage(message) {
        this.appStore.dispatch(new ActionPostItemComment({ text: message }));
    }
}
