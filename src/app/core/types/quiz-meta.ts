import { QuizId, ItemId } from './id';

export interface QuizMeta {
    id: QuizId;
    name: string;
    shortName: string;
    description: string;
    descriptionFull: string;
    totalQuestions: number;
    timeLimit: number;
    randomizeItems: boolean;
    itemIds: ItemId[];
}
