import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizDataSource, QuizId, QuizItem, ItemId } from '../../core';
import { QuizMetaAdmin } from '../types/quiz-meta-admin';
import { QuizItemAdmin } from '../types/quiz-item-admin';

@Injectable()
export class QuizAdminService {
    constructor(private quizDataSource: QuizDataSource) {
    }

    loadQuiz(quizId: QuizId): Observable<QuizMetaAdmin> {
        return this.quizDataSource.get<QuizMetaAdmin>(`/admin/quizes/${quizId}`);
    }

    loadItem(itemId: ItemId): Observable<QuizItemAdmin> {
        return this.quizDataSource.get<QuizItemAdmin>(`/admin/items/${itemId}`);
    }

    createItem(quizId: QuizId, item: QuizItemAdmin): Observable<QuizItem> {
        return this.quizDataSource.post<QuizItemAdmin>(`/admin/items?quizId=${encodeURIComponent(quizId)}`, item);
    }

    updateItem(item: QuizItemAdmin): Observable<QuizItemAdmin> {
        return this.quizDataSource.put<QuizItemAdmin>(`/admin/items/${item.id}`, item);
    }

    deleteItem(itemId: ItemId): Observable<{}> {
        return this.quizDataSource.delete<{}>(`/admin/items/${itemId}`);
    }
}
