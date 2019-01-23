import { QuizMeta, QuizItem, ChoiceId, ItemId, QuizItemChoice, QuizItemChoiceAnswer, QuizItemAnswer } from '../../core';

export type QuizItems = Map<ItemId, QuizItem>;
export type ItemChoices = Map<ChoiceId, QuizItemChoice>;
export type QuizChoices = Map<ItemId, ItemChoices>;
export type QuizAnswers = Map<ItemId, QuizItemAnswer>;

interface QuizStateProgress {
    step: number;
    items: QuizItems;
    choices: QuizChoices;
    answers: QuizAnswers;
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

export interface QuizItemStatus extends QuizItem {
    choicesStatus: (QuizItemChoice & QuizItemChoiceAnswer & { wrong: boolean; })[];
    correct: boolean;
    wrong: boolean;
}

export const initialQuizState: QuizStateProgress = {
    step: 1,
    items: new Map<ItemId, QuizItem>(),
    choices: new Map<ItemId, ItemChoices>(),
    answers: new Map<ItemId, QuizItemAnswer>()
};
