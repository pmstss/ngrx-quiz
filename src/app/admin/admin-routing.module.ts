import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { QuizMetaEditorComponent } from './components/quiz-meta-editor/quiz-meta-editor.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { AdminWelcomeComponent } from './components/admin-welcome/admin-welcome.component';
import { AdminComponent } from './components/admin.component';
import { QuizItemsListComponent } from './components/quiz-items-list/quiz-items-list.component';

const routes = [
    {
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
            component: QuizMetaEditorComponent
        }, {
            path: 'quiz/:quizId/items',
            component: QuizItemsListComponent
        }, {
            path: 'quiz/:quizId/items/:itemId',
            component: ItemEditorComponent
        }]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
