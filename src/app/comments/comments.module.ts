/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CommentMessageComponent } from './components/comment-message/comment-message.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NbListModule, NbSpinnerModule } from '@nebular/theme';
import { SharedModule } from '../shared';

@NgModule({
    declarations: [CommentFormComponent, CommentMessageComponent, CommentsComponent],
    imports: [
        FormsModule,
        NbListModule,
        NbSpinnerModule,
        QuillModule,
        SharedModule
    ],
    exports: [CommentsComponent]
})
export class CommentsModule { }
