import { QuizMeta } from '../types/quiz-meta';
import { QuizItem } from '../types/quiz-item';
import { QuizItemChoiceAnswer } from '../types/quiz-item-choice-answer';
import { QuizItemChoice } from '../types/quiz-item-choice';

/*** Internal data types that should be used only inside QuizService
 *  External data types uses Maps instead of plain objects/arrays;
 *  QuizService does conversion between that types.
 */

export interface ResponseWrapper<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface QuizSessionResponse {
    answers: { [itemId: string]: QuizItemAnswerResponse };
    score: number;
}

export interface QuizMetaResponse {
    quizMeta: QuizMeta;
    quizState: QuizSessionResponse;
}

export interface QuizItemResponse extends QuizItem {
    choices: QuizItemChoice[];
}

export interface QuizItemAnswerResponse {
    choices: QuizItemChoiceAnswer[];
    correct: boolean;
}
