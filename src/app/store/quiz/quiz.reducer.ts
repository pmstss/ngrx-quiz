import { Action } from '@ngrx/store';
import {
    QuizActionTypes, ActionLoadItem, ActionToggleChoice, ActionLoadQuizSuccess,
    ActionLoadItemSuccess, ActionSubmitAnswerSuccess
} from './quiz.actions';
import { initialQuizState, QuizStateNormalized } from './quiz.state';
import { selectActiveItemChoices, selectQuizNextStep, selectQuizActiveItem } from './quiz.selectors';
import { ItemId, ChoiceId, QuizItemChoice } from '../../core';

function getRootState(state) {
    return {
        quiz: state,
        auth: null,
        token: null
    };
}

export function quizReducer(state = null, action: Action): QuizStateNormalized {
    if (reducers[action.type]) {
        return reducers[action.type](state, action);
    }

    return state;
}

const reducers = {
    [QuizActionTypes.LOAD_QUIZ]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        return {
            ...state,
            ...initialQuizState
        };
    },

    [QuizActionTypes.LOAD_QUIZ_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const quizMeta = (<ActionLoadQuizSuccess>action).payload.quizMeta;
        const quizSession = (<ActionLoadQuizSuccess>action).payload.quizSession;

        const tmpState: QuizStateNormalized = {
            ...state,
            ...quizMeta,
            answers: new Map(quizSession.answers),
            step: 0
        };

        const step = selectQuizNextStep(getRootState(tmpState));
        return {
            ...tmpState,
            step
        };
    },

    [QuizActionTypes.LOAD_ITEM]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const payload = (<ActionLoadItem>action).payload;
        console.log('### LOAD_ITEM reducer, step: ', payload.step);
        return {
            ...state,
            step: payload.step
        };
    },

    [QuizActionTypes.LOAD_ITEM_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const { item, choices } = (<ActionLoadItemSuccess>action).payload;
        console.log('### LOAD_ITEM_SUCCESS reducer, item: ', item);
        const res = {
            ...state,
            choices: (new Map(state.choices)).set(item.id, choices),
            items: (new Map(state.items)).set(item.id, item)
        };
        return res;
    },

    [QuizActionTypes.TOGGLE_CHOICE]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const item = selectQuizActiveItem(getRootState(state));
        const payload = (<ActionToggleChoice>action).payload;
        const choices = new Map<ChoiceId, QuizItemChoice>(selectActiveItemChoices(getRootState(state)));
        choices.get(payload.choiceId).checked = !choices.get(payload.choiceId).checked;

        return {
            ...state,
            choices: (new Map<ItemId, Map<ChoiceId, QuizItemChoice>>(state.choices)).set(item.id, choices)
        };
    },

    [QuizActionTypes.SUBMIT_ANSWER_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const item = selectQuizActiveItem(getRootState(state));
        const answer = (action as ActionSubmitAnswerSuccess).payload.answer;
        return {
            ...state,
            answers: (new Map(state.answers)).set(item.id, answer)
        };
    },

    [QuizActionTypes.RESET_QUIZ_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        return {
            ...state,
            ...initialQuizState
        };
    }
};
