import { QuizMeta, QuizItem, ChoiceId, ItemId, QuizItemChoice, QuizItemChoiceAnswer } from '../../core';

export interface QuizState {
    quizMeta: QuizMeta;
    quizName: string;
    itemIds: ItemId[];
    items: Map<ItemId, QuizItem>;
    choices: Map<ItemId, Map<ChoiceId, QuizItemChoice>>;
    answers: Map<ItemId, Map<ChoiceId, QuizItemChoiceAnswer>>;
    score: number;
    step: number;
    nextStep: number;
    finished: boolean;

    resetInProgress?: boolean;
}

export const initialQuizState: QuizState = {
    quizMeta: null,
    quizName: null,
    itemIds: [],
    items: new Map<ItemId, QuizItem>(),
    choices: new Map<ItemId, Map<ChoiceId, QuizItemChoice>>(),
    answers: new Map<ItemId, Map<ChoiceId, QuizItemChoiceAnswer>>(),
    step: 1,
    nextStep: 0,
    score: 0,
    finished: false,
    resetInProgress: false
};
