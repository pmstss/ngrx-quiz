/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { createSelector } from '@ngrx/store';
import { QuizId, ItemId, QuizItem, Comment } from 'ngrx-quiz-common';
import { QuizState, QuizStateNormalized, QuizItemStatus, QuizStateCalculated, ItemAnswerStatus,
    AnswerStatuses, QuizItems, StepStatus } from './quiz.state';
import { AppState, selectQuizStateNormalized } from '../app.state';

export const selectQuizId = createSelector<AppState, QuizStateNormalized, QuizId>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized): QuizId => state && state.id
);

export const selectQuizStep = createSelector<AppState, QuizStateNormalized, number>(
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

const selectQuizAnswers = createSelector<AppState, QuizStateNormalized, AnswerStatuses>(
    selectQuizStateNormalized,
    (state: QuizStateNormalized) => state && state.answers
);

const selectQuizFinished = createSelector<AppState, number, AnswerStatuses, boolean>(
    selectQuizTotalQuestions,
    selectQuizAnswers,
    (total: number, answers: AnswerStatuses) => {
        if (!answers) {
            return false;
        }
        return total === [...answers.values()].filter(a => a.submitted).length;
    }
);

const selectQuizStarted = createSelector<AppState, AnswerStatuses, boolean>(
    selectQuizAnswers,
    (answers: AnswerStatuses) => answers && answers.size > 0
);

export const selectQuizActiveItem = createSelector<AppState, QuizItems, ItemId[], number, QuizItem>(
    selectQuizItems,
    selectQuizItemIds,
    selectQuizStep,
    (items: QuizItems, itemIds: ItemId[], step: number) => items && itemIds && items.get(itemIds[step - 1])
);

export const selectQuizActiveItemId = createSelector<AppState, ItemId[], number, ItemId>(
    selectQuizItemIds,
    selectQuizStep,
    (itemIds: ItemId[], step: number) => itemIds && itemIds[step - 1]
);

export const selectItemComments = createSelector<AppState, QuizStateNormalized, ItemId, Comment[]>(
    selectQuizStateNormalized,
    selectQuizActiveItemId,
    (state: QuizStateNormalized, itemId: ItemId): Comment[] => state ? state.comments.get(itemId) : null
);

export const selectItemCommentsLoadedSize = createSelector<AppState, Comment[], number>(
    selectItemComments,
    (comments: Comment[]) => comments && comments.length || 0
);

export const selectItemCommentsTotal = createSelector<AppState, QuizItem, number>(
    selectQuizActiveItem,
    (quizItem: QuizItem) => quizItem && quizItem.numberOfComments || 0
);

export const selectQuizStepStatuses = createSelector<AppState, ItemId[], AnswerStatuses, StepStatus[]>(
    selectQuizItemIds,
    selectQuizAnswers,
    (itemIds: ItemId[], answers: AnswerStatuses) => itemIds.map((itemId: ItemId) => {
        const answer = answers.get(itemId);
        return {
            submitted: answer && answer.submitted || false,
            correct: answer && answer.correct || false,
        };
    })
);

export const selectQuizNextStep =
        createSelector<AppState, ItemId[], number, number, boolean, AnswerStatuses, number>(
    selectQuizItemIds,
    selectQuizStep,
    selectQuizTotalQuestions,
    selectQuizFinished,
    selectQuizAnswers,
    (itemIds: ItemId[], startStep: number, total: number, finished: boolean, answers: AnswerStatuses) => {
        if (!itemIds || !answers) {
            return 0;
        }

        if (!finished) {
            for (let idx = startStep; idx <= startStep + total; ++idx) {
                const answer = answers.get(itemIds[idx % total]);
                if (!answer || !answer.submitted) {
                    return idx % total + 1;
                }
            }
        }
        return 1;
    }
);

export const selectActiveItemAnswer = createSelector<AppState, ItemId, AnswerStatuses, ItemAnswerStatus>(
    selectQuizActiveItemId,
    selectQuizAnswers,
    (itemId: ItemId, answers: AnswerStatuses) => answers && answers.get(itemId)
);

export const selectAnsweredCount = createSelector<AppState, AnswerStatuses, number>(
    selectQuizAnswers,
    (answers: AnswerStatuses) => !answers ? 0 : [...answers.keys()].filter((itemId: ItemId) =>
        answers.get(itemId).submitted
    ).length
);

export const selectActiveItemAnswered = createSelector<AppState, ItemAnswerStatus, boolean>(
    selectActiveItemAnswer,
    (answer: ItemAnswerStatus) => answer && answer.submitted
);

export const selectQuizScore = createSelector<AppState, AnswerStatuses, number>(
    selectQuizAnswers,
    (answers: AnswerStatuses) => answers &&
        [...answers.values()].reduce((score, answer) => score + (answer.submitted && answer.correct ? 1 : 0), 0)
);

export const selectQuizStateCalculated
        = createSelector<AppState, number, boolean, boolean, number, number, number, QuizStateCalculated>(
    selectQuizTotalQuestions,
    selectQuizStarted,
    selectQuizFinished,
    selectQuizNextStep,
    selectAnsweredCount,
    selectQuizScore,
    (total: number, started: boolean, finished: boolean, nextStep: number, answeredCounter: number, score: number) => ({
        started,
        finished,
        nextStep,
        answeredCounter,
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

export const selectActiveItemStatus = createSelector<AppState, QuizItem, ItemAnswerStatus, QuizItemStatus>(
    selectQuizActiveItem,
    selectActiveItemAnswer,
    (item: QuizItem, itemAnswer: ItemAnswerStatus) => {
        if (!item) {
            return null;
        }

        const answered = itemAnswer && itemAnswer.submitted;
        return {
            ...item,
            answered,
            correct: answered && itemAnswer.correct,
            wrong: answered && !itemAnswer.correct,
            choicesStatus: item.choices.map((choice) => {
                const choiceAnswer = itemAnswer.choiceAnswers.get(choice.id);
                const active = answered && choiceAnswer.checked;
                return {
                    ...choice,
                    ...choiceAnswer,
                    wrong: active && !choiceAnswer.correct,
                    semiCorrect: active && choiceAnswer.correct && !itemAnswer.correct
                };
            })
        };
    }
);
