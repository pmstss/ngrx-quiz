/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
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
                path: '',
                loadChildren: '../quiz-list/quiz-list.module#QuizListModule',
                canActivate: []
            },
            {
                path: 'auth',
                loadChildren: '../auth-ui/auth-ui.module#AuthUIModule'
            },
            {
                path: 'quiz',
                loadChildren: '../quiz/quiz-routing.module#QuizRoutingModule'
            },
            {
                path: 'result',
                loadChildren: '../result/quiz-result.module#QuizResultModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'top',
                loadChildren: '../rating/rating.module#RatingModule'
            },
            {
                path: 'about',
                loadChildren: '../about/about.module#AboutModule'
            },
            {
                path: 'admin',
                loadChildren: '../admin/admin.module#AdminModule',
                canActivate: [AdminAuthGuard]
            },
            {
                path: '**',
                redirectTo: ''
            }],
            {
                // enableTracing: true // for debug
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
