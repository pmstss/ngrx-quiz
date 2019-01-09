import { ChoiceId, QuizItemChoice } from '../../core';

export class QuizItemChoiceAdmin implements QuizItemChoice {
    id: ChoiceId;
    text: string;
    correct: boolean;
}
