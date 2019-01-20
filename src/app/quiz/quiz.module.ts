import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizGuard } from './guards/quiz.guard';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizResultGuard } from './guards/quiz-result.guard';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from '../shared';

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
                canActivate: [QuizResultGuard, QuizGuard]
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
    providers: [QuizGuard, QuizNameGuard, QuizResultGuard]
})
export class QuizModule {
    constructor() {
        console.log('### QuizModule constructor');
    }
}
