import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CommentMessageComponent } from './components/comment-message/comment-message.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
    declarations: [CommentFormComponent, CommentMessageComponent, CommentsComponent],
    imports: [
        CommonModule,
        FormsModule,
        QuillModule
    ],
    exports: [CommentsComponent]
})
export class CommentsModule { }
