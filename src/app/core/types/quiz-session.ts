import { ItemId } from './id';
import { QuizItemAnswer } from './quiz-item-answer';

export interface QuizSession {
    answers: Map<ItemId, QuizItemAnswer>;
    score: number;
}
