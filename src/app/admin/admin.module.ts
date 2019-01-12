import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbTooltipModule } from '@nebular/theme';
import { QuillModule } from 'ngx-quill';
import { AdminComponent } from './components/admin.component';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { QuizMetaEditorComponent } from './components/quiz-meta-editor/quiz-meta-editor.component';
import { StatsComponent } from './components/stats/stats.component';
import { AdminWelcomeComponent } from './components/admin-welcome/admin-welcome.component';
import { QuizAdminService } from './services/quiz-admin.service';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { QuizItemsListComponent } from './components/quiz-items-list/quiz-items-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        QuillModule,
        NbCardModule,
        NbInputModule,
        NbTooltipModule
    ],
    declarations: [
        AdminComponent,
        ItemEditorComponent,
        QuizListComponent,
        QuizMetaEditorComponent,
        QuizItemsListComponent,
        StatsComponent,
        AdminWelcomeComponent
    ],
    providers: [QuizAdminService]
})
export class AdminModule {
}
