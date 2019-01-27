import { QuizMeta, QuizItem, ItemId, QuizItemChoice, QuizItemChoiceAnswer,
    QuizItemAnswer, QuizItems, QuizAnswers
} from '../../core';

interface QuizStateProgress {
    step: number;
    items: QuizItems;
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
    answers: new Map<ItemId, QuizItemAnswer>()
};
