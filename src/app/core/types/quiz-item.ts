import { QuizItemChoice } from './quiz-item-choice';

export interface QuizItem {
    id: string;
    question: string;
    randomizeChoices: boolean;
    singleChoice: boolean;
    choices: QuizItemChoice[];
}
