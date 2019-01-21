import { ChoiceId } from './id';

export interface QuizItemChoiceAnswer {
    id: ChoiceId;
    correct: boolean;
    checked: boolean;
    explanation: string;
    popularity: number;
}
