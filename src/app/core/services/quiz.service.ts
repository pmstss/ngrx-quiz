import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QuizItem } from '../types/quiz-item';
import { QuizMeta, QuizMetaListItem } from '../types/quiz-meta';
import { ChoiceId, ItemId, QuizId } from '../types/id';
import { QuizItemChoice } from '../types/quiz-item-choice';
import { QuizItemAnswer } from '../types/quiz-item-answer';
import { QuizItemAnswerResponse, QuizItemResponse, QuizMetaResponse } from '../api/api.types';
import { ApiService } from '../api/api.service';
import { QuizSession } from '../types/quiz-session';
import { QuizItemChoiceAnswer } from '../types/quiz-item-choice-answer';
import { ItemChoices } from '../../store';

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

    loadQuizMeta(shortName: string): Observable<{quizMeta: QuizMeta, quizSession: QuizSession}> {
        return this.apiService.get<QuizMetaResponse>(`/quizes/${encodeURIComponent(shortName)}`).pipe(
            catchError((err) => {
                // TODO ### centralized handling?
                if (err.status === 404) {
                    this.router.navigateByUrl('/quizes');
                } else {
                    return throwError(err);
                }
            }),
            map((res) => {
                const answers = res.quizState.answers;
                return {
                    quizMeta: res.quizMeta,
                    quizSession: {
                        score: res.quizState.score,
                        answers: Object.keys(answers).reduce((map, itemId) => {
                            const itemAnswer = answers[itemId];
                            return map.set(itemId, {
                                choiceAnswers: arrayToMap(itemAnswer.choices),
                                correct: itemAnswer.correct
                            });
                        }, new Map<ItemId, QuizItemAnswer>())
                    }
                };
            })
        );
    }

    loadItem(id: ItemId): Observable<{item: QuizItem, choices: ItemChoices}> {
        return this.apiService.get<QuizItemResponse>(`/items/${encodeURIComponent(id)}`).pipe(
            map((res) => {
                const item = { ...res, answered: false };
                delete item.choices;
                return {
                    item,
                    choices: arrayToMap<ChoiceId, QuizItemChoice>(res.choices)
                };
            })
        );
    }

    submitAnswer(quizId: QuizId, itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<QuizItemAnswer> {
        return this.apiService.post<QuizItemAnswerResponse>(`/answers/${itemId}`, {
            quizId,
            choiceIds: [...choiceIds]
        }).pipe(
            map(res => ({
                choiceAnswers: arrayToMap<ChoiceId, QuizItemChoiceAnswer>(res.choices),
                correct: res.correct
            }))
        );
    }

    resetQuiz(quizId: QuizId): Observable<{}> {
        return this.apiService.post<{}>(`/reset/${quizId}`, {});
    }
}
