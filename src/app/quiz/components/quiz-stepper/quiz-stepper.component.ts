/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { QuizState, StepStatus, AppState, selectQuizState, selectQuizStepStatuses } from '../../../store';

@Component({
    selector: 'app-quiz-stepper',
    templateUrl: './quiz-stepper.component.html',
    styleUrls: ['./quiz-stepper.component.scss']
})
export class QuizStepperComponent implements OnInit {
    @Input() highlightActive = true;

    quizState$: Observable<QuizState>;
    stepStatuses$: Observable<StepStatus[]>;

    constructor(private appStore: Store<AppState>) { }

    ngOnInit() {
        this.quizState$ = this.appStore.select(selectQuizState);
        this.stepStatuses$ = this.appStore.select(selectQuizStepStatuses);
    }
}
