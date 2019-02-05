import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizModule } from './quiz.module';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizGuard } from './guards/quiz.guard';

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
                canActivate: [QuizGuard]
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
