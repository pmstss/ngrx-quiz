import { Action } from '@ngrx/store';
import { ChoiceId, QuizMeta, QuizItem, QuizId, QuizItemChoice, QuizItemAnswer, ServerQuizState } from '../../core';

export enum QuizActionTypes {
    LOAD_QUIZ = '[Quiz] Load Quiz',
    LOAD_QUIZ_SUCCESS = '[Quiz] Load Quiz Success',
    LOAD_QUIZ_ERROR = '[Quiz] Load Quiz Error',
    LOAD_ITEM = '[Quiz] Load Item',
    LOAD_ITEM_SUCCESS = '[Quiz] Load Item Success',
    LOAD_ITEM_ERROR = '[Quiz] Load Item Error',
    TOGGLE_CHOICE = '[Quiz] Toggle Choice',
    SUBMIT_ANSWER = '[Quiz] Submit answer',
    SUBMIT_ANSWER_SUCCESS = '[Quiz] Submit answer Success',
    SUBMIT_ANSWER_ERROR = '[Quiz] Submit answer Error',
    RESET_QUIZ = '[Quiz] Reset',
    RESET_QUIZ_SUCCESS = '[Quiz] Reset Success',
    RESET_QUIZ_ERROR = '[Quiz] Reset Error',
}

export class ActionLoadQuiz implements Action {
    readonly type = QuizActionTypes.LOAD_QUIZ;
    constructor(public payload: { quizName: string; }) {}
}

export class ActionLoadQuizSuccess implements Action {
    readonly type = QuizActionTypes.LOAD_QUIZ_SUCCESS;
    constructor(public payload: { quizMeta: QuizMeta, serverQuizState: ServerQuizState }) {}
}

export class ActionLoadQuizError implements Action {
    readonly type = QuizActionTypes.LOAD_QUIZ_ERROR;
    constructor(public payload: any) {}
}

export class ActionLoadItem implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM;
    constructor(public payload: { quizId: QuizId, step: number; }) {}
}

export class ActionLoadItemSuccess implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM_SUCCESS;
    constructor(public payload: { item: QuizItem; choices: Map<ChoiceId, QuizItemChoice>}) {}
}

export class ActionLoadItemError implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM_ERROR;
    constructor(public payload: any) {}
}

export class ActionToggleChoice implements Action {
    readonly type = QuizActionTypes.TOGGLE_CHOICE;
    constructor(public payload: { choiceId: ChoiceId; }) {}
}

export class ActionSubmitAnswer implements Action {
    readonly type = QuizActionTypes.SUBMIT_ANSWER;
}

export class ActionSubmitAnswerSuccess implements Action {
    readonly type = QuizActionTypes.SUBMIT_ANSWER_SUCCESS;
    constructor(public payload: { answer: QuizItemAnswer }) {}
}

export class ActionSubmitAnswerError implements Action {
    readonly type = QuizActionTypes.SUBMIT_ANSWER_ERROR;
    constructor(public payload: any) {}
}

export class ActionResetQuiz implements Action {
    readonly type = QuizActionTypes.RESET_QUIZ;
    constructor(public payload: {}) {}
}

export class ActionResetQuizSuccess implements Action {
    readonly type = QuizActionTypes.RESET_QUIZ_SUCCESS;
    constructor(public payload: { quizName: string }) {}
}

export class ActionResetQuizError implements Action {
    readonly type = QuizActionTypes.RESET_QUIZ_ERROR;
    constructor(public payload: any) {}
}
