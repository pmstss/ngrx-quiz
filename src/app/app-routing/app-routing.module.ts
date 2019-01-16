import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared';
import { AdminAuthGuard } from '../auth';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(
            [{
                path: '',
                component: HeaderComponent,
                outlet: 'header'
            },
            {
                path: 'quizes',
                loadChildren: '../quiz-list/quiz-list.module#QuizListModule'
            }, {
                path: 'quiz',
                loadChildren: '../quiz/quiz.module#QuizModule'
            },
            {
                path: 'admin',
                loadChildren: '../admin/admin.module#AdminModule',
                canActivate: [AdminAuthGuard]
            }/*,
            {
                path: '**',
                redirectTo: '/quizes'
            }*/],
            {
                enableTracing: true // TODO ### for debug
            }
        )
    ],
    exports: []
})
export class AppRoutingModule { }
