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
    finished: boolean;

    isAnswered(step: number): boolean;
    isAnsweredCorrectly(step: number): boolean;
}

export const initialQuizState: QuizState = {
    quizMeta: null,
    quizName: null,
    itemIds: [],
    items: new Map<ItemId, QuizItem>(),
    choices: new Map<ItemId, Map<ChoiceId, QuizItemChoice>>(),
    answers: new Map<ItemId, Map<ChoiceId, QuizItemChoiceAnswer>>(),
    step: 1,
    score: 0,
    finished: false,

    isAnswered(step: number): boolean {
        return this.answers.has(this.itemIds[step - 1]);
    },

    isAnsweredCorrectly(step: number): boolean {
        if (!this.isAnswered(step)) {
            return false;
        }
        const userAnswer = [...this.choices.get(this.itemIds[step - 1]).values()]
            .filter((ch: QuizItemChoice) => ch.checked).map(ch => ch.id);
        const correctIds = [...this.answers.get(this.itemIds[step - 1]).values()]
            .filter((ch: QuizItemChoiceAnswer) => ch.correct).map(ch => ch.id);
        return userAnswer.length === correctIds.length && userAnswer.every(id => correctIds.includes(id));
    }
};
