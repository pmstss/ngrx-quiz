import { Action } from '@ngrx/store';
import {
    QuizActionTypes, ActionLoadItem, ActionToggleChoice, ActionLoadQuizSuccess,
    ActionLoadItemSuccess, ActionLoadQuiz, ActionSubmitAnswerSuccess
} from './quiz.actions';
import { QuizState, initialQuizState } from './quiz.state';
import { selectActiveItemChoices, selectActiveItem } from './quiz.selectors';
import { ItemId, ChoiceId, QuizItem, QuizItemChoice, QuizMeta } from '../../core';

function getRootState(quizState) {
    return {
        quiz: quizState,
        auth: null,
        token: null
    };
}

function getNextStep(quizState: QuizState, currentStep: number = 0) {
    if (quizState && quizState.quizMeta && !quizState.finished) {
        const total = quizState.quizMeta.totalQuestions;
        const nextStep = currentStep + 1;
        for (let idx = nextStep - 1; idx < nextStep + total; ++idx) {
            if (!quizState.answers.has(quizState.quizMeta.itemIds[idx % total])) {
                return idx % total + 1;
            }
        }
    }
    return 1;
}

export function quizReducer(quizState = initialQuizState, action: Action): QuizState {
    switch (action.type) {
        case QuizActionTypes.LOAD_QUIZ:
        case QuizActionTypes.LOAD_QUIZ_SUCCESS:
        case QuizActionTypes.LOAD_ITEM:
        case QuizActionTypes.LOAD_ITEM_SUCCESS:
        case QuizActionTypes.TOGGLE_CHOICE:
        case QuizActionTypes.SUBMIT_ANSWER:
        case QuizActionTypes.SUBMIT_ANSWER_SUCCESS:
            return reducers[action.type](quizState, action);

        // TODO ### handle errors
        case QuizActionTypes.LOAD_QUIZ_ERROR:
        case QuizActionTypes.LOAD_ITEM_ERROR:
        case QuizActionTypes.SUBMIT_ANSWER_ERROR:
        default:
            return quizState;
    }
}

const reducers = {
    [QuizActionTypes.LOAD_QUIZ]: (quizState: QuizState, action: Action): QuizState => {
        const payload = (<ActionLoadQuiz>action).payload;
        return {
            ...initialQuizState,
            quizName: payload.quizName
        };
    },

    [QuizActionTypes.LOAD_QUIZ_SUCCESS]: (quizState: QuizState, action: Action): QuizState => {
        const quizMeta = (<ActionLoadQuizSuccess>action).payload.quizMeta;
        const serverState = (<ActionLoadQuizSuccess>action).payload.quizState;

        const answers = Object.keys(serverState.answers).reduce(
            (answers, itemId) => answers.set(
                itemId,
                serverState.answers[itemId].choices.reduce((map, ch) => map.set(ch.id, ch), new Map())
            ),
            new Map(quizState.answers)
        );

        const state = {
            ...quizState,
            quizMeta,
            answers,
            score: serverState.score,
            finished: answers.size === quizMeta.totalQuestions
        };

        const step = getNextStep(state);
        return {
            ...state,
            step,
            nextStep: getNextStep(state, step)
        };
    },

    [QuizActionTypes.LOAD_ITEM]: (quizState: QuizState, action: Action): QuizState => {
        const payload = (<ActionLoadItem>action).payload;
        return {
            ...quizState,
            step: payload.step,
            nextStep: getNextStep(quizState, payload.step)
        };
    },

    [QuizActionTypes.LOAD_ITEM_SUCCESS]: (quizState: QuizState, action: Action): QuizState => {
        const { item, choices } = (<ActionLoadItemSuccess>action).payload;
        const res = {
            ...quizState,
            choices: quizState.choices.set(item.id, choices),
            items: (new Map(quizState.items)).set(item.id, item)
        };
        return res;
    },

    [QuizActionTypes.TOGGLE_CHOICE]: (quizState: QuizState, action: Action): QuizState => {
        const item = selectActiveItem(getRootState(quizState));
        if (item.answered) {
            return quizState;
        }

        const payload = (<ActionToggleChoice>action).payload;
        const choices = new Map<ChoiceId, QuizItemChoice>(selectActiveItemChoices(getRootState(quizState)));
        choices.get(payload.choiceId).checked = !choices.get(payload.choiceId).checked;

        return {
            ...quizState,
            choices: (new Map<ItemId, Map<ChoiceId, QuizItemChoice>>(quizState.choices)).set(item.id, choices)
        };
    },

    [QuizActionTypes.SUBMIT_ANSWER]: (quizState: QuizState, action: Action): QuizState => {
        const item = selectActiveItem(getRootState(quizState));
        return {
            ...quizState,
            // TODO ### answered
            items: (new Map<ItemId, QuizItem>(quizState.items)).set(item.id, { ...item, answered: true })
        };
    },

    [QuizActionTypes.SUBMIT_ANSWER_SUCCESS]: (quizState: QuizState, action: Action): QuizState => {
        const item = selectActiveItem(getRootState(quizState));
        const payload = (<ActionSubmitAnswerSuccess>action).payload;
        const answers = (new Map(quizState.answers)).set(item.id, payload.answer.choiceAnswers);
        return {
            ...quizState,
            answers,
            finished: answers.size === quizState.quizMeta.totalQuestions,
            score: quizState.score + (payload.answer.correct ? 1 : 0)
        };
    }
};
