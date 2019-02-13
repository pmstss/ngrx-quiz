/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizId, ItemId, QuizMetaAdmin, QuizItemAdmin, QuizMetaListItem } from 'ngrx-quiz-common';
import { ApiService } from '../../core';

@Injectable()
export class QuizAdminService {
    constructor(private apiService: ApiService) {
    }

    loadQuizList(): Observable<QuizMetaListItem[]> {
        return this.apiService.get<QuizMetaListItem[]>('/admin/quizes');
    }

    loadQuiz(quizId: QuizId): Observable<QuizMetaAdmin> {
        return this.apiService.get<QuizMetaAdmin>(`/admin/quizes/${quizId}`);
    }

    createQuiz(quizMeta: QuizMetaAdmin) {
        return this.apiService.post<{}>('/admin/quizes', quizMeta);
    }

    updateQuiz(quizMeta: QuizMetaAdmin) {
        return this.apiService.put<{}>(`/admin/quizes/${quizMeta.id}`, quizMeta);
    }

    deleteQuiz(quizId: QuizId): Observable<void> {
        return this.apiService.delete<void>(`/admin/quizes/${quizId}`);
    }

    publishQuiz(quizId: QuizId): Observable<void> {
        return this.apiService.post<void>(`/admin/quizes/publish/${quizId}`, null);
    }

    unpublishQuiz(quizId: QuizId): Observable<void> {
        return this.apiService.delete<void>(`/admin/quizes/unpublish/${quizId}`);
    }

    loadItem(itemId: ItemId): Observable<QuizItemAdmin> {
        return this.apiService.get<QuizItemAdmin>(`/admin/items/${itemId}`);
    }

    createItem(quizId: QuizId, item: QuizItemAdmin): Observable<QuizItemAdmin> {
        return this.apiService.post<QuizItemAdmin>(`/admin/items?quizId=${encodeURIComponent(quizId)}`, item);
    }

    updateItem(item: QuizItemAdmin): Observable<QuizItemAdmin> {
        return this.apiService.put<QuizItemAdmin>(`/admin/items/${item.id}`, item);
    }

    deleteItem(itemId: ItemId): Observable<void> {
        return this.apiService.delete<void>(`/admin/items/${itemId}`);
    }

    updateQuizItemsOrder(quizId: QuizId, itemIds: ItemId[]) {
        return this.apiService.put<{}>(`/admin/items/order/${quizId}`, { itemIds });
    }
}
