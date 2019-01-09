import { QuizMeta } from '../../core';
import { QuizItemAdmin } from './quiz-item-admin';

export interface QuizMetaAdmin extends QuizMeta {
    items: QuizItemAdmin[];
}
