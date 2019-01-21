import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from '../shared';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizFinishedGuard } from './guards/quiz-finished.guard';
import { QuizGuard } from './guards/quiz.guard';

@NgModule({
    declarations: [QuizStepComponent, QuizIntroComponent, QuizResultComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            children: [{
                path: ':name',
                component: QuizIntroComponent
            }, {
                path: ':name/result',
                component: QuizResultComponent,
                canActivate: [QuizFinishedGuard, QuizGuard]
            }, {
                path: ':name/:step',
                component: QuizStepComponent,
                canActivate: [QuizGuard]
            }]
        }]),
        QuillModule,
        NbCardModule,
        SharedModule
    ],
    providers: [QuizGuard, QuizFinishedGuard]
})
export class QuizModule {
    constructor() {
    }
}
