import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared';
import { AdminAuthGuard, AuthGuard } from '../auth';

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
                path: 'auth',
                loadChildren: '../auth-ui/auth-ui.module#AuthUIModule',
            },
            {
                path: 'quizes',
                loadChildren: '../quiz-list/quiz-list.module#QuizListModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'quiz',
                loadChildren: '../quiz/quiz.module#QuizModule',
                canActivate: [AuthGuard]
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
                // enableTracing: true // TODO ### for debug
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
