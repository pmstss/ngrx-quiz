import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizDataSource } from '../datasource/quiz-data-source.service';
import { QuizItem } from '../types/quiz-item';
import { QuizMeta } from '../types/quiz-meta';
import { ChoiceId, ItemId } from '../types/id';
import { QuizItemChoice } from '../types/quiz-item-choice';
import { QuizItemAnswer } from '../types/quiz-item-answer';

@Injectable()
export class QuizService {
    constructor(protected quizDataSource: QuizDataSource) {
    }

    loadQuizList(): Observable<QuizMeta[]> {
        return this.quizDataSource.getQuizList();
    }

    loadQuizMeta(shortName: string): Observable<{quizMeta: QuizMeta, itemIds: ItemId[]}> {
        return this.quizDataSource.getQuizByShortName(shortName);
    }

    loadItem(itemId: ItemId): Observable<{item: QuizItem, choices: Map<ChoiceId, QuizItemChoice>}> {
        return this.quizDataSource.getItem(itemId);
    }

    submitAnswer(itemId: ItemId, choiceIds: Set<ChoiceId>): Observable<QuizItemAnswer> {
        return this.quizDataSource.submitAnswer(itemId, choiceIds);
    }
}
