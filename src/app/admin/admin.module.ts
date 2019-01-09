import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AdminComponent } from './components/admin.component';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { StatsComponent } from './components/stats/stats.component';
import { AdminWelcomeComponent } from './components/admin-welcome/admin-welcome.component';
import { QuizAdminService } from './services/quiz-admin.service';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            component: AdminComponent,
            children: [{
                path: '',
                component: AdminWelcomeComponent
            }, {
                path: 'quizes',
                component: QuizListComponent,
            }, {
                path: 'quiz/:quizId',
                component: QuizDetailsComponent
            }, {
                path: 'quiz/:quizId/items/new',
                component: ItemEditorComponent,
            }, {
                path: 'quiz/:quizId/items/:itemId',
                component: ItemEditorComponent
            }, {
                path: 'stats',
                component: StatsComponent
            }]
        }, {
            path: '**',
            redirectTo: ''
        }]),
        QuillModule,
        NbCardModule
    ],
    declarations: [
        AdminComponent,
        ItemEditorComponent,
        QuizListComponent,
        QuizDetailsComponent,
        StatsComponent,
        AdminWelcomeComponent
    ],
    providers: [QuizAdminService]
})
export class AdminModule {
}
