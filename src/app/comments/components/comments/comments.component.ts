import { Component, AfterViewInit, Input, ContentChildren,
    QueryList, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'ngrx-quiz-common';
import { CommentMessageComponent } from '../comment-message/comment-message.component';
import { trigger, useAnimation, transition } from '@angular/animations';
import { lightSpeedIn, fadeIn, flip } from 'ng-animate';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    animations: [
        trigger('animComment', [transition(':enter', useAnimation(fadeIn))])
    ]
})
export class CommentsComponent implements AfterViewInit, OnInit {
    @Input() title: string = 'Comments';
    @Input('comments') comments$: Observable<Comment[]>;
    @Input('editor') editor: boolean = false;

    @Output('comment') commentEmitter = new EventEmitter<{ text: string }>();

    @ContentChildren(CommentMessageComponent) messageComponents: QueryList<CommentMessageComponent>;

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.messageComponents.changes.subscribe((messages) => {
            alert('### changes');
            console.log('### there are changes in messages: %o', messages);
        });
    }

    onMessage(message) {
        this.commentEmitter.emit({
            text: message
        });
    }
}
