import { QuizItem, QuizItemChoice } from '../../core';
import { QuizItemChoiceAdmin } from './quiz-item-choice-admin';

export interface QuizItemAdmin extends QuizItem {
    choices: QuizItemChoiceAdmin[];
    order: number;
}
