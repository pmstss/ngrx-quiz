/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbStepperModule } from '@nebular/theme';
import { WysiwygModule } from '../wysiwyg';
import { SharedModule } from '../shared';
import { CommentsModule } from '../comments';
import { QuizStepComponent } from './components/quiz-step/quiz-step.component';
import { QuizStepChoiceComponent } from './components/quiz-step-choice/quiz-step-choice.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizStepperComponent } from './components/quiz-stepper/quiz-stepper.component';
import { QuizFinishedGuard } from './guards/quiz-finished.guard';
import { QuizGuard } from './guards/quiz.guard';

@NgModule({
    declarations: [QuizStepComponent, QuizIntroComponent, QuizStepChoiceComponent, QuizStepperComponent],
    imports: [
        RouterModule,
        FormsModule,
        NbStepperModule,
        SharedModule,
        WysiwygModule,
        CommentsModule
    ],
    providers: [QuizGuard, QuizFinishedGuard],
    exports: [SharedModule, QuizStepperComponent]
})
export class QuizModule {
    constructor() {
    }
}
