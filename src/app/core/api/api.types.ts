import { QuizMeta } from '../types/quiz-meta';
import { QuizItem } from '../types/quiz-item';
import { QuizItemChoiceAnswer } from '../types/quiz-item-choice-answer';
import { ChoiceId, ItemId } from '../types/id';

export interface ResponseWrapper<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface QuizMetaResponse extends QuizMeta {
    items: { id: ItemId }[];
}

export interface QuizItemResponse extends QuizItem {
    choices: {id: ChoiceId, text: string}[];
}

export interface QuizItemAnswerResponse {
    choices: QuizItemChoiceAnswer[];
    correct: boolean;
}
