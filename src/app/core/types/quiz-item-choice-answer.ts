import { ChoiceId } from './id';

export interface QuizItemChoiceAnswer {
    id: ChoiceId;
    correct: boolean;
    explanation: string;
    popularity: number;
}
