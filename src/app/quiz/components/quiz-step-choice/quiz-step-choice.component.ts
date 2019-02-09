import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuizItemChoiceStatus, AppState, ActionToggleChoice } from '../../../store';
import { shake, rubberBand, pulse } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
    selector: 'app-quiz-step-choice',
    templateUrl: './quiz-step-choice.component.html',
    styleUrls: ['./quiz-step-choice.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('myShake', [
            transition('* => wrong', useAnimation(shake)),
            transition('* => correct', useAnimation(rubberBand), { params: { timing: 0.4 } }),
            transition('none => checked', useAnimation(pulse), { params: { scale: 1.05, timing: 0.3 } })
        ])
    ]
})
export class QuizStepChoiceComponent {
    @Input() answered: boolean;
    @Input() choice: QuizItemChoiceStatus;

    constructor(private appStore: Store<AppState>) { }

    toggleChoice(choiceId: string): void {
        this.appStore.dispatch(new ActionToggleChoice({ choiceId }));
    }

    getAnimationState(choice: QuizItemChoiceStatus): string {
        if (this.answered && choice.checked) {
            return choice.wrong ? 'wrong' : 'correct';
        }
        if (choice.checked) {
            return 'checked';
        }
        return 'none';
    }
}
