import { Component, AfterViewInit, Input, ContentChildren,
    QueryList, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentMessageComponent } from '../comment-message/comment-message.component';
import { Comment } from '../../comment';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements AfterViewInit, OnInit {
    @Input('comments') comments$: Observable<Comment[]>;
    @Input() title: string = 'Comments';
    @Output('comment') commentEmitter = new EventEmitter<{ text: string }>();

    @ContentChildren(CommentMessageComponent) messageComponents: QueryList<CommentMessageComponent>;

    collapsed: boolean = true;

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
