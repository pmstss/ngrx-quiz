/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Action } from '@ngrx/store';
import { ItemId, ChoiceId, QuizMeta, QuizItem, Comment } from 'ngrx-quiz-common';
import { ItemAnswerStatus, AnswersState } from './quiz.state';

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
    LOAD_ITEM_COMMENTS = '[Quiz] Load Item Comments',
    LOAD_ITEM_COMMENTS_SUCCESS = '[Quiz] Load Item Comments Success',
    LOAD_ITEM_COMMENTS_ERROR = '[Quiz] Load Item Comments Error',
    POST_ITEM_COMMENT = '[Quiz] Post Item Comment',
    POST_ITEM_COMMENT_SUCCESS = '[Quiz] Post Item Comment Success',
    POST_ITEM_COMMENT_ERROR = '[Quiz] Post Item Comment Error'
}

export class ActionLoadQuiz implements Action {
    readonly type = QuizActionTypes.LOAD_QUIZ;
    constructor(public payload: { quizName: string; }) {}
}

export class ActionLoadQuizSuccess implements Action {
    readonly type = QuizActionTypes.LOAD_QUIZ_SUCCESS;
    constructor(public payload: { quiz: QuizMeta & AnswersState }) {}
}

export class ActionLoadQuizError implements Action {
    readonly type = QuizActionTypes.LOAD_QUIZ_ERROR;
    constructor(public payload: any) {}
}

export class ActionLoadItem implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM;
    constructor(public payload: { step: number; }) {}
}

export class ActionLoadItemSuccess implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM_SUCCESS;
    constructor(public payload: { item: QuizItem }) {}
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
    constructor(public payload: { answer: ItemAnswerStatus }) {}
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

export class ActionLoadItemComments implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM_COMMENTS;
}

export class ActionLoadItemCommentsSuccess implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM_COMMENTS_SUCCESS;
    constructor(public payload: { itemId: ItemId, comments?: Comment[],
        offset: number, alreadyLoaded?: boolean }) {}
}

export class ActionLoadItemCommentsError implements Action {
    readonly type = QuizActionTypes.LOAD_ITEM_COMMENTS_ERROR;
    constructor(public payload: any) {}
}

export class ActionPostItemComment implements Action {
    readonly type = QuizActionTypes.POST_ITEM_COMMENT;
    constructor(public payload: { text: string }) {}
}

export class ActionPostItemCommentSuccess implements Action {
    readonly type = QuizActionTypes.POST_ITEM_COMMENT_SUCCESS;
    constructor(public payload: { itemId: ItemId, comment: Comment }) {}
}

export class ActionPostItemCommentError implements Action {
    readonly type = QuizActionTypes.POST_ITEM_COMMENT_ERROR;
    constructor(public payload: any) {}
}
