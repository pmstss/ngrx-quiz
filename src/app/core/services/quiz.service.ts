import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QuizItem } from '../types/quiz-item';
import { QuizMeta } from '../types/quiz-meta';
import { ChoiceId, ItemId } from '../types/id';
import { QuizItemChoice } from '../types/quiz-item-choice';
import { QuizItemAnswer } from '../types/quiz-item-answer';
import { QuizItemAnswerResponse, ResponseWrapper, QuizItemResponse, QuizMetaResponse } from '../api/api.types';
import { ApiService } from '../api/api.service';

@Injectable()
export class QuizService {
    constructor(private apiService: ApiService) {
    }

    loadQuizList(): Observable<QuizMeta[]> {
        return this.apiService.get<QuizMeta[]>('/quizes').pipe(catchError(this.apiService.handleError));
    }

    loadQuizMeta(shortName: string): Observable<{quizMeta: QuizMeta, itemIds: ItemId[]}> {
        return this.apiService.get<QuizMetaResponse>(`/quizes/${encodeURIComponent(shortName)}`).pipe(
            map((res) => {
                const quizMeta = { ...res, totalQuestions: res.items.length };
                delete quizMeta.items;
                return {
                    quizMeta,
                    itemIds: res.items.map(x => x.id)
                };
            }),
            catchError(this.apiService.handleError)
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
            }),
            catchError(this.apiService.handleError)
        );
    }

    submitAnswer(itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<QuizItemAnswer> {
        return this.apiService.post<QuizItemAnswerResponse>(`/answers/${itemId}`, {
            choiceIds: [...choiceIds]
        }).pipe(
            map(res => ({
                choiceAnswers: res.choices.reduce((map, ch) => map.set(ch.id, ch), new Map()),
                correct: res.correct
            })),
            catchError(this.apiService.handleError)
        );
    }
}
