import { ChoiceId, QuizItemChoice, QuizItemChoiceAnswer } from '../../core';

export class QuizItemChoiceAdmin implements QuizItemChoice, QuizItemChoiceAnswer {
    id: ChoiceId;
    text: string;
    correct: boolean;
    explanation: string;
    popularity: number;
}
