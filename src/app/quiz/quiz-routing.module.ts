/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizModule } from './quiz.module';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizGuard } from './guards/quiz.guard';
import { AuthGuard } from '../auth';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([{
            path: '',
            children: [{
                path: ':name',
                component: QuizIntroComponent
            }, {
                path: ':name/:step',
                component: QuizStepComponent,
                canActivate: [AuthGuard, QuizGuard]
            }]
        }]),
        QuizModule
    ],
    providers: []
})
export class QuizRoutingModule {
    constructor() {
    }
}
