import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizId, QuizItem, ItemId, ApiService } from '../../core';
import { QuizMetaAdmin } from '../types/quiz-meta-admin';
import { QuizItemAdmin } from '../types/quiz-item-admin';

@Injectable()
export class QuizAdminService {
    constructor(private apiService: ApiService) {
    }

    loadQuiz(quizId: QuizId): Observable<QuizMetaAdmin> {
        return this.apiService.get<QuizMetaAdmin>(`/admin/quizes/${quizId}`);
    }

    loadItem(itemId: ItemId): Observable<QuizItemAdmin> {
        return this.apiService.get<QuizItemAdmin>(`/admin/items/${itemId}`);
    }

    createItem(quizId: QuizId, item: QuizItemAdmin): Observable<QuizItem> {
        return this.apiService.post<QuizItemAdmin>(`/admin/items?quizId=${encodeURIComponent(quizId)}`, item);
    }

    updateItem(item: QuizItemAdmin): Observable<QuizItemAdmin> {
        return this.apiService.put<QuizItemAdmin>(`/admin/items/${item.id}`, item);
    }

    deleteItem(itemId: ItemId): Observable<{}> {
        return this.apiService.delete<{}>(`/admin/items/${itemId}`);
    }

    createQuiz(quizMeta: QuizMetaAdmin) {
        return this.apiService.post<{}>('/admin/quizes', quizMeta);
    }

    updateQuiz(quizMeta: QuizMetaAdmin) {
        return this.apiService.put<{}>(`/admin/quizes/${quizMeta.id}`, quizMeta);
    }

    updateQuizItemsOrder(quizId: QuizId, itemIds: ItemId[]) {
        return this.apiService.put<{}>(`/admin/order/${quizId}`, { itemIds });
    }

    deleteQuiz(quizId: QuizId): Observable<{}> {
        return this.apiService.delete<{}>(`/admin/quizes/${quizId}`);
    }
}
