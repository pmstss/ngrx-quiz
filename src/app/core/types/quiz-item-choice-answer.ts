import { ChoiceId } from './id';

export interface QuizItemChoiceAnswer {
    id: ChoiceId;
    checked: boolean;
    correct?: boolean;
    explanation?: string;
    popularity?: number;
}
