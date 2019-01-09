import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { LoginComponent } from '../login/login/login.component';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(
            [{
                path: '',
                component: HeaderComponent,
                outlet: 'header'
            }, {
                path: 'auth',
                loadChildren: '../login/login.module#LoginModule'
            }, {
                path: 'quizes',
                loadChildren: '../quiz-list/quiz-list.module#QuizListModule'
            }, {
                path: 'quiz',
                loadChildren: '../quiz/quiz.module#QuizModule'
            },
            {
                path: 'admin',
                loadChildren: '../admin/admin.module#AdminModule'
            },
            {
                path: '**',
                redirectTo: '/quizes'
            }],
            {
                // enableTracing: true // TODO ### for debug
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
