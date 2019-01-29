import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuizItemChoiceStatus, AppState, ActionToggleChoice } from '../../../store';

@Component({
    selector: 'app-quiz-step-choice',
    templateUrl: './quiz-step-choice.component.html',
    styleUrls: ['./quiz-step-choice.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizStepChoiceComponent {
    @Input() answered: boolean;
    @Input() choice: QuizItemChoiceStatus;

    constructor(private appStore: Store<AppState>) { }

    toggleChoice(choiceId: string): void {
        this.appStore.dispatch(new ActionToggleChoice({ choiceId }));
    }
}
