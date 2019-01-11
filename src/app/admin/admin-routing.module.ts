import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { AdminWelcomeComponent } from './components/admin-welcome/admin-welcome.component';
import { AdminComponent } from './components/admin.component';

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
