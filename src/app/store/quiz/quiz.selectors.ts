import { createSelector } from '@ngrx/store';
import { QuizItem, QuizItemChoiceAnswer, QuizId, ItemId } from '../../core';
import { QuizState, QuizStateNormalized, QuizAnswers, QuizChoices,
    QuizItemStatus, QuizItems, ItemChoices, QuizStateCalculated } from './quiz.state';
import { AppState, selectQuizStateNormalized } from '../app.state';
import { QuizItemAnswer } from 'src/app/core/types/quiz-item-answer';

export const selectQuizId = createSelector<AppState, QuizStateNormalized, QuizId>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized): QuizId => state && state.id
);

const selectQuizStep = createSelector<AppState, QuizStateNormalized, number>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.step
);

const selectQuizItemIds = createSelector<AppState, QuizStateNormalized, ItemId[]>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.itemIds
);

const selectQuizTotalQuestions = createSelector<AppState, ItemId[], number>(
    selectQuizItemIds,
    (itemIds: ItemId[]) => itemIds && itemIds.length
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

export const selectQuizStateCalculated
        = createSelector<AppState, number, boolean, boolean, number, number, QuizStateCalculated>(
    selectQuizTotalQuestions,
    selectQuizStarted,
    selectQuizFinished,
    selectQuizNextStep,
    selectQuizScore,
    (total: number, started: boolean, finished: boolean, nextStep: number, score: number): QuizStateCalculated => ({
        started,
        finished,
        nextStep,
        score,
        totalQuestions: total
    })
);

export const selectQuizState = createSelector<AppState, QuizStateNormalized, QuizStateCalculated, QuizState>(
    selectQuizStateNormalized,  // TODO ### extract shorter version of interface for memoization?
    selectQuizStateCalculated,
    (state: QuizStateNormalized, calculatedState: QuizStateCalculated): QuizState => ({
        ...state,
        ...calculatedState
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

        const answered = !!itemAnswer;
        return {
            ...item,
            answered,
            correct: answered && itemAnswer.correct,
            wrong: answered && !itemAnswer.correct,
            choicesStatus: [...choices.keys()].map((choiceId) => {
                const choiceAnswer = answered && itemAnswer.choiceAnswers.get(choiceId);
                const checked = !!choiceAnswer && choiceAnswer.checked;
                return {
                    ...choices.get(choiceId),
                    ...choiceAnswer,
                    wrong: checked && !choiceAnswer.correct,
                    semiCorrect: checked && choiceAnswer.correct && !itemAnswer.correct
                };
            })
        };
    }
);
