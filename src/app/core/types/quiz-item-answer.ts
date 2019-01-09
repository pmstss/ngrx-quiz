import { ChoiceId } from './id';
import { QuizItemChoiceAnswer } from './quiz-item-choice-answer';

export interface QuizItemAnswer {
    choiceAnswers: Map<ChoiceId, QuizItemChoiceAnswer>;
    correct: boolean;
}
