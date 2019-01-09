import { QuizItem, QuizItemChoice } from '../../core';
import { QuizItemChoiceAdmin } from './quiz-item-choice-admin';

export class QuizItemAdmin implements QuizItem {
    id: string;
    question: string;
    randomizeChoices: boolean;
    singleChoice: boolean;
    answered: boolean;

    choices: QuizItemChoiceAdmin[];
}
