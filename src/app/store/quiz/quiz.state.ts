import { QuizMeta, QuizItem, ChoiceId, ItemId, QuizItemChoice, QuizItemChoiceAnswer } from '../../core';

export interface QuizStateAux {
    step: number;
    items: Map<ItemId, QuizItem>;
    choices: Map<ItemId, Map<ChoiceId, QuizItemChoice>>;
    answers: Map<ItemId, Map<ChoiceId, QuizItemChoiceAnswer>>;
}

export interface QuizStateNormalized extends QuizMeta, QuizStateAux {
}

export interface QuizState extends QuizStateNormalized {
    nextStep: number;
    started: boolean;
    finished: boolean;
    score: number;
}

export const initialQuizState: QuizStateAux = {
    step: 1,
    items: new Map<ItemId, QuizItem>(),
    choices: new Map<ItemId, Map<ChoiceId, QuizItemChoice>>(),
    answers: new Map<ItemId, Map<ChoiceId, QuizItemChoiceAnswer>>()
};
