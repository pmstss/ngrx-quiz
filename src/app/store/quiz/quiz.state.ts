/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { ItemId, ChoiceId, QuizMeta, QuizItem, QuizItemChoice, QuizItemChoiceAnswer, Comment } from 'ngrx-quiz-common';

export type QuizItems = Map<ItemId, QuizItem>;

export interface ItemAnswerStatus {
    choiceAnswers: Map<ChoiceId, QuizItemChoiceAnswer>;
    submitted: boolean;
    correct: boolean;
}

export type AnswerStatuses = Map<ItemId, ItemAnswerStatus>;

export interface AnswersState {
    answers: AnswerStatuses;
}

interface QuizStateProgress extends AnswersState {
    step: number;
    items: QuizItems;
    comments: Map<ItemId, Comment[]>;
}

export interface QuizStateNormalized extends QuizMeta, QuizStateProgress {
}

export interface QuizStateCalculated {
    nextStep: number;
    started: boolean;
    finished: boolean;
    answeredCounter: number;
    score: number;
    totalQuestions: number;
}

export interface QuizState extends QuizStateNormalized, QuizStateCalculated {
}

export interface QuizItemChoiceStatus extends QuizItemChoice, QuizItemChoiceAnswer {
    wrong: boolean;
    semiCorrect: boolean;
}

export interface QuizItemStatus extends QuizItem {
    choicesStatus: QuizItemChoiceStatus[];
    answered: boolean;
    correct: boolean;
    wrong: boolean;
}

export const initialQuizState: QuizStateProgress = {
    step: 1,
    items: new Map<ItemId, QuizItem>(),
    answers: new Map<ItemId, ItemAnswerStatus>(),
    comments: new Map<ItemId, Comment[]>()
};
