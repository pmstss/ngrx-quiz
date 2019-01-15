import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { QuizItem } from '../types/quiz-item';
import { QuizMeta } from '../types/quiz-meta';
import { ChoiceId, ItemId } from '../types/id';
import { QuizItemChoice } from '../types/quiz-item-choice';
import { QuizItemAnswer } from '../types/quiz-item-answer';
import { BASE_URL } from '../tokens';
import { QuizItemAnswerResponse, ResponseWrapper, QuizItemResponse, QuizMetaResponse } from './data-source.types';

@Injectable()
export class QuizDataSource {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject(BASE_URL) baseUrl) {
        this.apiUrl = `${baseUrl}/api`;
    }

    handleError(error: HttpErrorResponse) {
        console.error(error);
        if (error.error instanceof ErrorEvent) {
            return throwError({
                title: 'Client side network error',
                message: error.error.message
            });
        }

        return throwError({
            ...error,
            title: 'Network error'
        });
    }

    throwIfNotSuccess<T>(res: ResponseWrapper<T>): void {
        if (!res.success) {
            throwError(res.message || 'Unsuccessful response');
        }
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<ResponseWrapper<T>>(`${this.apiUrl}${url}`).pipe(
            tap(this.throwIfNotSuccess),
            catchError(this.handleError),
            map(res => res.data)
        );
    }

    post<T>(url: string, data: any): Observable<T> {
        return this.http.post<ResponseWrapper<T>>(`${this.apiUrl}${url}`, data).pipe(
            tap(this.throwIfNotSuccess),
            catchError(this.handleError),
            map(res => res.data)
        );
    }

    put<T>(url: string, data: any): Observable<T> {
        return this.http.put<ResponseWrapper<T>>(`${this.apiUrl}${url}`, data).pipe(
            tap(this.throwIfNotSuccess),
            catchError(this.handleError),
            map(res => res.data)
        );
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<ResponseWrapper<T>>(`${this.apiUrl}${url}`).pipe(
            tap(this.throwIfNotSuccess),
            catchError(this.handleError),
            map(res => res.data)
        );
    }

    getQuizList(): Observable<QuizMeta[]> {
        return this.get<QuizMeta[]>('/quizes').pipe(catchError(this.handleError));
    }

    getQuizByShortName(shortName: string): Observable<{quizMeta: QuizMeta, itemIds: ItemId[]}> {
        return this.get<QuizMetaResponse>(`/quizes/${encodeURIComponent(shortName)}`).pipe(
            map((res) => {
                const quizMeta = { ...res, totalQuestions: res.items.length };
                delete quizMeta.items;
                return {
                    quizMeta,
                    itemIds: res.items.map(x => x.id)
                };
            }),
            catchError(this.handleError)
        );
    }

    getItem(id: ItemId): Observable<{item: QuizItem, choices: Map<ChoiceId, QuizItemChoice>}> {
        return this.get<QuizItemResponse>(`/items/${encodeURIComponent(id)}`).pipe(
            map((res) => {
                const item = { ...res, answered: false };
                delete item.choices;
                return {
                    item,
                    choices: res.choices.reduce(
                        (choicesMap, choice) => choicesMap.set(choice.id, choice),
                        new Map<ChoiceId, QuizItemChoice>()
                    )
                };
            }),
            catchError(this.handleError)
        );
    }

    submitAnswer(itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<QuizItemAnswer> {
        return this.post<QuizItemAnswerResponse>(`/answers/${itemId}`, {
            choiceIds: [...choiceIds]
        }).pipe(
            map(res => ({
                choiceAnswers: res.choices.reduce((map, ch) => map.set(ch.id, ch), new Map()),
                correct: res.correct
            })),
            catchError(this.handleError)
        );
    }
}
