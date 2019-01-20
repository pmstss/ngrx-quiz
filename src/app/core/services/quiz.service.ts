import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QuizItem } from '../types/quiz-item';
import { QuizMeta } from '../types/quiz-meta';
import { ChoiceId, ItemId } from '../types/id';
import { QuizItemChoice } from '../types/quiz-item-choice';
import { QuizItemAnswer } from '../types/quiz-item-answer';
import { QuizItemAnswerResponse, QuizItemResponse, QuizMetaResponse } from '../api/api.types';
import { ApiService } from '../api/api.service';

@Injectable()
export class QuizService {
    constructor(private router: Router, private apiService: ApiService) {
    }

    loadQuizList(): Observable<QuizMeta[]> {
        return this.apiService.get<QuizMeta[]>('/quizes');
    }

    loadQuizMeta(shortName: string): Observable<QuizMeta> {
        return this.apiService.get<QuizMetaResponse>(`/quizes/${encodeURIComponent(shortName)}`).pipe(
            catchError((err) => {
                if (err.status === 404) {
                    this.router.navigateByUrl('/quizes');
                } else {
                    return throwError(err);
                }
            })
        );
    }

    loadItem(id: ItemId): Observable<{item: QuizItem, choices: Map<ChoiceId, QuizItemChoice>}> {
        return this.apiService.get<QuizItemResponse>(`/items/${encodeURIComponent(id)}`).pipe(
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
            })
        );
    }

    submitAnswer(itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<QuizItemAnswer> {
        return this.apiService.post<QuizItemAnswerResponse>(`/answers/${itemId}`, {
            choiceIds: [...choiceIds]
        }).pipe(
            map(res => ({
                choiceAnswers: res.choices.reduce((map, ch) => map.set(ch.id, ch), new Map()),
                correct: res.correct
            }))
        );
    }
}
