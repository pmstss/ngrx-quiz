import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NbCardModule } from '@nebular/theme';
import { SharedModule } from '../shared';
import { CommentsModule } from '../comments';
import { ChartsModule } from '../charts';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizStepChoiceComponent } from './components/quiz-step-choice/quiz-step-choice.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizFinishedGuard } from './guards/quiz-finished.guard';
import { QuizGuard } from './guards/quiz.guard';

@NgModule({
    declarations: [QuizStepComponent, QuizIntroComponent, QuizResultComponent, QuizStepChoiceComponent],
    imports: [
        FormsModule,
        RouterModule.forChild([{
            path: '',
            children: [{
                path: ':name',
                component: QuizIntroComponent
            }, {
                path: ':name/result',
                component: QuizResultComponent,
                canActivate: [QuizGuard, QuizFinishedGuard]
            }, {
                path: ':name/:step',
                component: QuizStepComponent,
                canActivate: [QuizGuard]
            }]
        }]),
        QuillModule,
        NbCardModule,
        CommentsModule,
        SharedModule,
        ChartsModule
    ],
    providers: [QuizGuard, QuizFinishedGuard]
})
export class QuizModule {
    constructor() {
    }
}
