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
    score: number;
    totalQuestions: number;
}

export interface QuizState extends QuizStateNormalized, QuizStateCalculated {
}

export interface QuizItemChoiceStatus extends QuizItemChoice, QuizItemChoiceAnswer {
    wrong: boolean;
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
