import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { trigger, useAnimation, transition } from '@angular/animations';
import { Observable, BehaviorSubject, of, Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { Comment } from 'ngrx-quiz-common';
import { fadeIn } from 'ng-animate';
import { AppState, selectItemComments, selectActiveItemAnswered,
    ActionLoadItemComments, ActionPostItemComment, selectQuizStep } from '../../../store';
import { filter, map, take } from 'rxjs/operators';
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
    private commentsExpanded = new BehaviorSubject<boolean>(false);

    commentsExpanded$: Observable<boolean> = this.commentsExpanded.asObservable();
    comments$: Observable<Comment[]>;
    commentsEditor = false;

    constructor(private appStore: Store<AppState>, private dialogService: DialogService) {
    }

    ngOnInit() {
        this.stepSubscription = this.appStore.select(selectQuizStep)
            .subscribe(() => this.commentsExpanded.next(false));

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
                this.dialogService.alert({
                    title: 'Information',
                    message: 'Please answer first to see comments'
                });
                return;
            }

            this.commentsExpanded.next(true);
            this.appStore.dispatch(new ActionLoadItemComments());
        });
    }

    hideComments() {
        this.commentsExpanded.next(false);
    }

    onMessage(message) {
        this.appStore.dispatch(new ActionPostItemComment({ text: message }));
    }
}
