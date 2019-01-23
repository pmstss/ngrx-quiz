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

/* "started" and "finished" are calculated on the base of answer when quiz is active in QuizState selector;
 * but for list they are returned as pre-calculated from server
 */
export interface QuizMetaListItem extends QuizMeta {
    started: boolean;
    finished: boolean;
}
