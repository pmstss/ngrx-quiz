import { ChoiceId } from './id';
import { QuizItemChoiceAnswer } from './quiz-item-choice-answer';

export type ChoiceAnswers = Map<ChoiceId, QuizItemChoiceAnswer>;

export interface QuizItemAnswer {
    choiceAnswers: ChoiceAnswers;
    submitted: boolean;
    correct?: boolean;
}
