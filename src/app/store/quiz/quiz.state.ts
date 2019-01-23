import { QuizMeta, QuizItem, ChoiceId, ItemId, QuizItemChoice, QuizItemChoiceAnswer, QuizItemAnswer } from '../../core';

export type QuizItems = Map<ItemId, QuizItem>;
export type ItemChoices = Map<ChoiceId, QuizItemChoice>;
export type QuizChoices = Map<ItemId, ItemChoices>;
export type QuizAnswers = Map<ItemId, QuizItemAnswer>;

interface QuizStateAux {
    step: number;
    items: QuizItems;
    choices: QuizChoices;
    answers: QuizAnswers;
}

export interface QuizStateNormalized extends QuizMeta, QuizStateAux {
}

export interface QuizState extends QuizStateNormalized {
    nextStep: number;
    started: boolean;
    finished: boolean;
    score: number;
}

export interface QuizItemStatus extends QuizItem {
    choicesStatus: (QuizItemChoice & QuizItemChoiceAnswer & { wrong: boolean; })[];
}

export const initialQuizState: QuizStateAux = {
    step: 1,
    items: new Map<ItemId, QuizItem>(),
    choices: new Map<ItemId, ItemChoices>(),
    answers: new Map<ItemId, QuizItemAnswer>()
};
