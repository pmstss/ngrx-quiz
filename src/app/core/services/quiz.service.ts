import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QuizId, ItemId, ChoiceId, QuizMeta, QuizMetaListItem, QuizItem,
    QuizItemChoiceAnswer, QuizSession, TopScore, Comment, QuizItemAnswer, QuizScore } from 'ngrx-quiz-common';
import { ItemAnswerStatus, AnswersState } from '../../store';
import { ApiService } from '../api/api.service';

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

    loadQuiz(shortName: string): Observable<QuizMeta & AnswersState> {
        return this.apiService.get<QuizMeta & QuizSession>(`/quizes/${encodeURIComponent(shortName)}`).pipe(
            catchError((err) => {
                // TODO ### centralized handling?
                if (err.status === 404) {
                    this.router.navigateByUrl('/');
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
                        new Map<ItemId, ItemAnswerStatus>()
                    )
                };
            })
        );
    }

    loadItem(id: ItemId): Observable<QuizItem> {
        return this.apiService.get<QuizItem>(`/items/${encodeURIComponent(id)}`);
    }

    submitAnswer(quizId: QuizId, itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<ItemAnswerStatus> {
        return this.apiService.post<QuizItemAnswer>(`/items/answers/${encodeURIComponent(itemId)}`, {
            quizId,
            choiceIds: [...choiceIds]
        }).pipe(
            map((res): ItemAnswerStatus => ({
                choiceAnswers: arrayToMap<ChoiceId, QuizItemChoiceAnswer>(res.choices),
                correct: res.correct,
                submitted: true
            }))
        );
    }

    resetQuiz(quizId: QuizId): Observable<void> {
        return this.apiService.post<void>(`/quizes/reset/${encodeURIComponent(quizId)}`, {});
    }

    loadTopScores(quizId: QuizId): Observable<TopScore[]> {
        return this.apiService.get<TopScore[]>(`/scores/top/${encodeURIComponent(quizId)}`);
    }

    loadComments(itemId: ItemId, offset: number): Observable<Comment[]> {
        return this.apiService.get<Comment[]>(
            `/comments/item/${encodeURIComponent(itemId)}?offset=${encodeURIComponent(offset.toString(10))}`);
    }

    postComment(itemId: ItemId, text: string): Observable<Comment> {
        return this.apiService.post<Comment>(`/comments/item/${encodeURIComponent(itemId)}`, {
            text
        });
    }

    getQuizScore(quizId: QuizId): Observable<QuizScore> {
        return this.apiService.get<QuizScore>(`/scores/quiz/${encodeURIComponent(quizId)}`);
    }

    getQuizScoreDistribution(quizId: QuizId): Observable<number[]> {
        return this.apiService.get<number[]>(`/scores/quiz-stats/${encodeURIComponent(quizId)}`);
    }
}
