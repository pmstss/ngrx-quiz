import { createSelector } from '@ngrx/store';
import { QuizItem, QuizItemChoice, ChoiceId, QuizItemChoiceAnswer, QuizId } from '../../core';
import { QuizState, QuizStateNormalized } from './quiz.state';
import { AppState, selectQuizStateNormalized } from '../app.state';
import { QuizHelpers } from './quiz-helpers';

// TODO ### clarify necessity
export interface QuizItemStatus extends QuizItem {
    choicesStatus: (QuizItemChoice & QuizItemChoiceAnswer & { wrong: boolean; })[];
}

export const selectQuizId = createSelector<AppState, QuizStateNormalized, QuizId>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized): QuizId => state.id
);

export const selectQuizState = createSelector<AppState, QuizStateNormalized, QuizState>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized): QuizState => ({
        ...state,
        nextStep: QuizHelpers.getNextStep(state),
        finished: QuizHelpers.isFinished(state),
        started: QuizHelpers.isStarted(state),
        score: QuizHelpers.getScore(state)
    })
);

export const selectActiveItem = createSelector<AppState, QuizStateNormalized, QuizItem>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state.items.get(state.itemIds[state.step - 1])
);

export const selectActiveItemChoices
        = createSelector<AppState, QuizStateNormalized, QuizItem, Map<ChoiceId, QuizItemChoice>>(
    selectQuizStateNormalized,
    selectActiveItem,
    (state: QuizStateNormalized, item: QuizItem) => state.choices.get(item.id)
);

export const selectActiveItemStatus = createSelector<AppState, QuizStateNormalized, QuizItem, QuizItemStatus>(
    selectQuizStateNormalized,
    selectActiveItem,
    (state: QuizStateNormalized, item: QuizItem) => {
        if (!item) {
            return null;
        }

        const choices: Map<ChoiceId, QuizItemChoice> = state.choices.get(item.id);
        const answers: Map<ChoiceId, QuizItemChoiceAnswer> = state.answers.get(item.id);
        return {
            ...item,
            answered: !!answers,
            choicesStatus: [...choices.keys()].map((choiceId) => {
                const answer = answers && answers.get(choiceId);
                return {
                    ...choices.get(choiceId),
                    ...answer || <QuizItemChoiceAnswer>{},
                    wrong: answers && answer && answer.checked && !answer.correct
                };
            })
        };
    }
);
