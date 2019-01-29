import { Action } from '@ngrx/store';
import { ChoiceId, QuizItemChoiceAnswer } from 'ngrx-quiz-common';
import { QuizActionTypes, ActionLoadItem, ActionToggleChoice, ActionLoadQuizSuccess,
    ActionLoadItemSuccess, ActionSubmitAnswerSuccess,
    ActionLoadItemCommentsSuccess, ActionPostItemCommentSuccess } from './quiz.actions';
import { initialQuizState, QuizStateNormalized } from './quiz.state';
import { selectQuizNextStep, selectQuizActiveItem, selectActiveItemAnswer } from './quiz.selectors';

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
            correct: false,
            choiceAnswers: item.choices.reduce(
                (choiceAnswers, ch) => {
                    return choiceAnswers.set(ch.id, {
                        id: ch.id,
                        checked: false,
                        correct: false,
                        explanation: null,
                        popularity: 0
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

    [QuizActionTypes.LOAD_ITEM_COMMENTS_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const payload = (action as ActionLoadItemCommentsSuccess).payload;
        return {
            ...state,
            comments: new Map(state.comments).set(payload.itemId, payload.comments)
        };
    },

    [QuizActionTypes.POST_ITEM_COMMENT_SUCCESS]: (state: QuizStateNormalized, action: Action): QuizStateNormalized => {
        const payload = (action as ActionPostItemCommentSuccess).payload;
        const comments = state.comments.get(payload.itemId);
        return {
            ...state,
            comments: new Map(state.comments).set(payload.itemId, [payload.comment, ...comments])
        };
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
