/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, Input } from '@angular/core';
import { Comment } from 'ngrx-quiz-common';

@Component({
    selector: 'app-comment-message',
    templateUrl: './comment-message.component.html',
    styleUrls: ['./comment-message.component.scss']
})
export class CommentMessageComponent {
    @Input() comment: Comment;

    constructor() { }

    getInitials(): string {
        return (this.comment.userName || '').split(' ').splice(0, 2).map(n => n.charAt(0)).join('').toUpperCase();
    }
}
