/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbListModule, NbSpinnerModule } from '@nebular/theme';
import { SharedModule } from '../shared';
import { WysiwygModule } from '../wysiwyg';
import { CommentMessageComponent } from './components/comment-message/comment-message.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
    declarations: [CommentFormComponent, CommentMessageComponent, CommentsComponent],
    imports: [
        FormsModule,
        NbListModule,
        NbSpinnerModule,
        WysiwygModule,
        SharedModule
    ],
    exports: [CommentsComponent]
})
export class CommentsModule { }
