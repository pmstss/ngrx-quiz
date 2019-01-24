import { Action } from '@ngrx/store';
import {
    QuizActionTypes, ActionLoadItem, ActionToggleChoice, ActionLoadQuizSuccess,
    ActionLoadItemSuccess, ActionSubmitAnswerSuccess
} from './quiz.actions';
import { initialQuizState, QuizStateNormalized } from './quiz.state';
import { selectQuizNextStep, selectQuizActiveItem, selectActiveItemAnswer } from './quiz.selectors';
import { ChoiceId, QuizItemChoiceAnswer } from 'src/app/core';

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
        const tmpState: QuizStateNormalized = {
            ...state,
            ...(<ActionLoadQuizSuccess>action).payload.quiz,
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
        return {
            ...state,
            step: payload.step
        };
    },

    [QuizActionTypes.LOAD_ITEM_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const { item }  = (<ActionLoadItemSuccess>action).payload;
        const answer = selectActiveItemAnswer(getRootState(state)) || {
            submitted: false,
            choiceAnswers: item.choices.reduce(
                (choiceAnswers, ch) => {
                    return choiceAnswers.set(ch.id, {
                        id: ch.id,
                        checked: false
                    });
                },
                new Map<ChoiceId, QuizItemChoiceAnswer>()
            )
        };

        const res = {
            ...state,
            items: (new Map(state.items)).set(item.id, item),
            answers: (new Map(state.answers)).set(item.id, answer)
        };
        return res;
    },

    [QuizActionTypes.TOGGLE_CHOICE]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const item = selectQuizActiveItem(getRootState(state));
        const answer = selectActiveItemAnswer(getRootState(state));
        const choiceId = (<ActionToggleChoice>action).payload.choiceId;

        if (answer.submitted) {
            return { ...state };
        }

        return {
            ...state,
            answers: (new Map(state.answers)).set(item.id, {
                ...answer,
                choiceAnswers: (new Map(answer.choiceAnswers)).set(choiceId, {
                    ...answer.choiceAnswers.get(choiceId),
                    checked: !answer.choiceAnswers.get(choiceId).checked
                })
            })
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
