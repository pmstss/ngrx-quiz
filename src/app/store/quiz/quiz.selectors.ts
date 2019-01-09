import { createSelector, select } from '@ngrx/store';
import { QuizItem, ItemId, QuizMeta, QuizId, QuizItemChoice, ChoiceId, QuizItemChoiceAnswer } from '../../core';
import { QuizState } from './quiz.state';
import { AppState, selectQuizState } from '../app.state';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';

export interface QuizItemStatus extends QuizItem {
    choicesStatus: (QuizItemChoice & QuizItemChoiceAnswer & { wrong: boolean; })[];
}

export const selectQuizName = createSelector<AppState, QuizState, string>(
    selectQuizState,
    (quiz: QuizState) => quiz.quizName
);

export const selectQuizMeta = createSelector<AppState, QuizState, QuizMeta>(
    selectQuizState,
    (quiz: QuizState) => quiz.quizMeta
);

export const selectQuizId = createSelector<AppState, QuizMeta, QuizId>(
    selectQuizMeta,
    (quizMeta: QuizMeta) => quizMeta && quizMeta.id
);

export const selectStep = createSelector<AppState, QuizState, number>(
    selectQuizState,
    (quiz: QuizState) => quiz.step
);

export const selectActiveItem = createSelector<AppState, QuizState, number, QuizItem>(
    selectQuizState,
    selectStep,
    (quiz: QuizState, step: number) => step && quiz.items.get(quiz.itemIds[step - 1])
);

export const selectActiveItemId = createSelector<AppState, QuizItem, string>(
    selectActiveItem,
    (item: QuizItem) => item.id
);

export const selectActiveItemChoices = createSelector<AppState, QuizState, ItemId, Map<ChoiceId, QuizItemChoice>>(
    selectQuizState,
    selectActiveItemId,
    (quizState: QuizState, itemId: string) => quizState.choices.get(itemId)
);

export const selectActiveItemStatus = createSelector<AppState, QuizState, QuizItem, QuizItemStatus>(
    selectQuizState,
    selectActiveItem,
    (quizState: QuizState, item: QuizItem) => {
        if (!item) {
            return null;
        }

        const choices: Map<ChoiceId, QuizItemChoice> = quizState.choices.get(item.id);
        const answers: Map<ChoiceId, QuizItemChoiceAnswer> = quizState.answers.get(item.id);
        return {
            ...item,
            choicesStatus: [...choices.keys()].map((choiceId) => {
                const answer = answers && answers.get(choiceId);
                return {
                    ...choices.get(choiceId),
                    ...answer || <QuizItemChoiceAnswer>{},
                    wrong: item.answered && answer && !answer.correct && choices.get(choiceId).checked
                };
            })
        };
    }
);
