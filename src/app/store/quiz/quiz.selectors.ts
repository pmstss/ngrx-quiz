import { createSelector } from '@ngrx/store';
import { QuizItem, QuizId, ItemId } from '../../core';
import { QuizState, QuizStateNormalized, QuizAnswers,
    QuizItemStatus, QuizItems, QuizStateCalculated } from './quiz.state';
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

const selectQuizFinished = createSelector<AppState, number, QuizAnswers, boolean>(
    selectQuizTotalQuestions,
    selectQuizAnswers,
    // (total: number, answers: QuizAnswers) => answers &&
    //     total === [...answers.values()].filter(a => a.submitted).length
    (total: number, answers: QuizAnswers) => {
        if (!answers) {
            return false;
        }
        return total === [...answers.values()].filter(a => a.submitted).length;
    }
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

const selectQuizActiveItemId = createSelector<AppState, ItemId[], number, ItemId>(
    selectQuizItemIds,
    selectQuizStep,
    (itemIds: ItemId[], step: number) => itemIds && itemIds[step - 1]
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

export const selectActiveItemAnswer = createSelector<AppState, ItemId, QuizAnswers, QuizItemAnswer>(
    selectQuizActiveItemId,
    selectQuizAnswers,
    (itemId: ItemId, answers: QuizAnswers) => answers && answers.get(itemId)
);

export const selectQuizScore = createSelector<AppState, QuizAnswers, number>(
    selectQuizAnswers,
    (answers: QuizAnswers) => answers &&
        [...answers.values()].reduce((score, answer) => score + (answer.submitted && answer.correct ? 1 : 0), 0)
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

export const selectActiveItemStatus = createSelector<AppState, QuizItem, QuizItemAnswer, QuizItemStatus>(
    selectQuizActiveItem,
    selectActiveItemAnswer,
    (item: QuizItem, itemAnswer: QuizItemAnswer) => {
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
