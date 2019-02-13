/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbTooltipModule, NbCheckboxModule } from '@nebular/theme';
import { QuillModule } from 'ngx-quill';
import { AdminComponent } from './components/admin.component';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { QuizMetaEditorComponent } from './components/quiz-meta-editor/quiz-meta-editor.component';
import { QuizAdminService } from './services/quiz-admin.service';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { QuizItemsListComponent } from './components/quiz-items-list/quiz-items-list.component';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        FormsModule,
        AdminRoutingModule,
        SharedModule,
        QuillModule,
        NbCardModule,
        NbInputModule,
        NbTooltipModule,
        NbCheckboxModule
    ],
    declarations: [
        AdminComponent,
        ItemEditorComponent,
        QuizListComponent,
        QuizMetaEditorComponent,
        QuizItemsListComponent
    ],
    providers: [QuizAdminService]
})
export class AdminModule {
}
