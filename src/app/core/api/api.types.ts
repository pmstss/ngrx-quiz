import { QuizMeta } from '../types/quiz-meta';
import { QuizItem } from '../types/quiz-item';
import { QuizItemChoiceAnswer } from '../types/quiz-item-choice-answer';
import { ChoiceId } from '../types/id';

export interface ResponseWrapper<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface ServerQuizState {
    answers: { [itemId: string]: QuizItemAnswerResponse };
    score: number;
}

export interface QuizMetaResponse extends QuizMeta {
    quizMeta: QuizMeta;
    quizState: ServerQuizState;
}

export interface QuizItemResponse extends QuizItem {
    choices: {id: ChoiceId, text: string}[];
}

export interface QuizItemAnswerResponse {
    choices: QuizItemChoiceAnswer[];
    correct: boolean;
}
