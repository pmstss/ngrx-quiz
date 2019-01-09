import { ChoiceId } from './id';

export interface QuizItemChoice {
    id: ChoiceId;
    text: string;
    checked?: boolean;
}
