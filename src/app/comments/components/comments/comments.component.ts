import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'ngrx-quiz-common';
import { trigger, useAnimation, transition } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animComment', [transition(':enter', useAnimation(fadeIn))])
    ]
})
export class CommentsComponent {
    @Input() title: string = 'Comments';
    @Input('comments') comments$: Observable<Comment[]>;
    @Input('editor') editor: boolean = false;

    @Output('comment') commentEmitter = new EventEmitter<{ text: string }>();

    onMessage(message) {
        this.commentEmitter.emit({
            text: message
        });
    }
}
