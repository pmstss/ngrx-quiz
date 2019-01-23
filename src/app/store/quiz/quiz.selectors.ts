import { createSelector } from '@ngrx/store';
import { QuizItem, QuizItemChoiceAnswer, QuizId, ItemId } from '../../core';
import { QuizState, QuizStateNormalized, QuizAnswers, QuizChoices,
    QuizItemStatus, QuizItems, ItemChoices } from './quiz.state';
import { AppState, selectQuizStateNormalized } from '../app.state';
import { QuizItemAnswer } from 'src/app/core/types/quiz-item-answer';

export const selectQuizId = createSelector<AppState, QuizStateNormalized, QuizId>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized): QuizId => state && state.id
);

const selectQuizTotalQuestions = createSelector<AppState, QuizStateNormalized, number>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.totalQuestions
);

const selectQuizStep = createSelector<AppState, QuizStateNormalized, number>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.step
);

const selectQuizItemIds = createSelector<AppState, QuizStateNormalized, ItemId[]>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.itemIds
);

const selectQuizItems = createSelector<AppState, QuizStateNormalized, QuizItems>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.items
);

const selectQuizAnswers = createSelector<AppState, QuizStateNormalized, QuizAnswers>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.answers
);

const selectQuizChoices = createSelector<AppState, QuizStateNormalized, QuizChoices>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.choices
);

const selectQuizFinished = createSelector<AppState, number, QuizAnswers, boolean>(
    selectQuizTotalQuestions,
    selectQuizAnswers,
    (total: number, answers: QuizAnswers) => answers && total === answers.size
);

const selectQuizStarted = createSelector<AppState, QuizAnswers, boolean>(
    selectQuizAnswers,
    (answers: QuizAnswers) => answers && answers.size > 0
);

export const selectQuizActiveItem = createSelector<AppState, QuizItems, ItemId[], number, QuizItem>(
    selectQuizItems,
    selectQuizItemIds,
    selectQuizStep,
    (items: QuizItems, itemIds: ItemId[], step: number) => items && itemIds && items.get(itemIds[step - 1])
);

const selectQuizActiveItemId = createSelector<AppState, QuizItem, ItemId>(
    selectQuizActiveItem,
    (item: QuizItem) => item && item.id
);

// TODO ### ngrx 7 parameterized selector for answered?
export const selectQuizNextStep = createSelector<AppState, ItemId[], number, number, boolean, QuizAnswers, number>(
    selectQuizItemIds,
    selectQuizStep,
    selectQuizTotalQuestions,
    selectQuizFinished,
    selectQuizAnswers,
    (itemIds: ItemId[], startStep: number, total: number, finished: boolean, answers: QuizAnswers) => {
        if (!itemIds || !answers) {
            return 0;
        }

        if (!finished) {
            for (let step = startStep + 1; step <= startStep + total + 1; ++step) {
                if (!answers.has(itemIds[step - 1])) {
                    return step;
                }
            }
        }
        return 1;
    }
);

export const selectActiveItemChoices = createSelector<AppState, ItemId, QuizChoices, ItemChoices>(
    selectQuizActiveItemId,
    selectQuizChoices,
    (itemId: ItemId, choices: QuizChoices) => choices && choices.get(itemId)
);

const selectActiveItemAnswers = createSelector<AppState, ItemId, QuizAnswers, QuizItemAnswer>(
    selectQuizActiveItemId,
    selectQuizAnswers,
    (itemId: ItemId, answers: QuizAnswers) => answers && answers.get(itemId)
);

export const selectQuizScore = createSelector<AppState, QuizAnswers, number>(
    selectQuizAnswers,
    (answers: QuizAnswers) => answers &&
        [...answers.values()].reduce((score, answer) => score + (answer.correct ? 1 : 0), 0)
);

export const selectQuizState
        = createSelector<AppState, QuizStateNormalized, boolean, boolean, number, number, QuizState>(
    selectQuizStateNormalized,  // TODO ### extract shorter version of interface for memoization?
    selectQuizStarted,
    selectQuizFinished,
    selectQuizNextStep,
    selectQuizScore,
    (state: QuizStateNormalized, started: boolean, finished: boolean, nextStep: number, score: number): QuizState => ({
        ...state,
        started,
        finished,
        nextStep,
        score
    })
);

export const selectActiveItemStatus =
        createSelector<AppState, QuizItem, ItemChoices, QuizItemAnswer, QuizItemStatus>(
    selectQuizActiveItem,
    selectActiveItemChoices,
    selectActiveItemAnswers,
    (item: QuizItem, choices: ItemChoices, itemAnswer: QuizItemAnswer) => {
        if (!item) {
            return null;
        }

        return {
            ...item,
            answered: !!itemAnswer,
            choicesStatus: [...choices.keys()].map((choiceId) => {
                const choiceAnswer = itemAnswer && itemAnswer.choiceAnswers.get(choiceId);
                return {
                    ...choices.get(choiceId),
                    ...choiceAnswer || <QuizItemChoiceAnswer>{},
                    wrong: itemAnswer && choiceAnswer && choiceAnswer.checked && !choiceAnswer.correct
                };
            })
        };
    }
);
