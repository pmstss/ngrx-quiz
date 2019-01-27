import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QuizItemAnswerResponse, QuizItemResponse } from '../api/api.types';
import { ApiService } from '../api/api.service';
import { QuizId, ItemId, ChoiceId, QuizMeta, QuizMetaListItem, QuizItem,
    QuizItemAnswer, QuizItemChoiceAnswer, QuizSession, TopScore, Comment } from '../types/common';

function arrayToMap<K, T extends { id: K }>(arr: T[]): Map<K, T> {
    return arr.reduce((map: Map<K, T>, el: T) => map.set(el.id, el), new Map<K, T>());
}

@Injectable()
export class QuizService {
    constructor(private router: Router, private apiService: ApiService) {
    }

    loadQuizList(): Observable<QuizMetaListItem[]> {
        return this.apiService.get<QuizMetaListItem[]>('/quizes');
    }

    loadQuiz(shortName: string): Observable<QuizMeta & QuizSession> {
        return this.apiService.get<QuizMeta & QuizSession>(`/quizes/${encodeURIComponent(shortName)}`).pipe(
            catchError((err) => {
                // TODO ### centralized handling?
                if (err.status === 404) {
                    this.router.navigateByUrl('/quizes');
                } else {
                    return throwError(err);
                }
            }),
            map((res) => {
                const answers = res.answers;
                return {
                    ...res,
                    answers: Object.keys(answers).reduce(
                        (map, itemId) => {
                            const itemAnswer = answers[itemId];
                            return map.set(itemId, {
                                choiceAnswers: arrayToMap(itemAnswer.choices),
                                correct: itemAnswer.correct,
                                submitted: true
                            });
                        },
                        new Map<ItemId, QuizItemAnswer>()
                    )
                };
            })
        );
    }

    loadItem(id: ItemId): Observable<QuizItem> {
        return this.apiService.get<QuizItemResponse>(`/items/${encodeURIComponent(id)}`);
    }

    submitAnswer(quizId: QuizId, itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<QuizItemAnswer> {
        return this.apiService.post<QuizItemAnswerResponse>(`/items/answers/${itemId}`, {
            quizId,
            choiceIds: [...choiceIds]
        }).pipe(
            map(res => ({
                choiceAnswers: arrayToMap<ChoiceId, QuizItemChoiceAnswer>(res.choices),
                correct: res.correct,
                submitted: true
            }))
        );
    }

    resetQuiz(quizId: QuizId): Observable<void> {
        return this.apiService.post<void>(`/quizes/reset/${quizId}`, {});
    }

    loadTopScores(quizId: QuizId): Observable<TopScore[]> {
        return this.apiService.get<TopScore[]>(`/quizes/top/${quizId}`);
    }

    loadComments(itemId: ItemId): Observable<Comment[]> {
        return this.apiService.get<Comment[]>(`/comments/item/${itemId}`);
    }

    postComment(itemId: ItemId, text: string): Observable<Comment> {
        return this.apiService.post<Comment>(`/comments/item/${itemId}`, {
            text
        });
    }
}
