import { QuizItem, QuizItemChoice, QuizItemChoiceAnswer } from '../types/common';

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
}

export interface QuizItemResponse extends QuizItem {
    choices: QuizItemChoice[];
}

export interface QuizItemAnswerResponse {
    choices: QuizItemChoiceAnswer[];
    correct: boolean;
}
