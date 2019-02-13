/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { quillToolbarConfig } from '../quill-comments-config';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
    @Output('message') messageEmitter = new EventEmitter<string>();
    @Input() collapsed: boolean;

    quillToolbarConfig = quillToolbarConfig;
    message: string = '';

    constructor() {
    }

    sendMessage() {
        if (this.message.trim().length) {
            this.messageEmitter.emit(this.message);
            this.message = '';
        }
    }
}
