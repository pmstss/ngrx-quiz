/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Observable, Subscription, combineLatest, BehaviorSubject, merge } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NbSearchService } from '@nebular/theme';
import { QuizMetaListItem } from 'ngrx-quiz-common';
import { QuizService, AutoUnsubscribe } from '../../../core';
import { flipInX } from 'ng-animate';

interface SearchQuery {
    term: string;
    // "some ID, can be later used in the search service to determine which search component triggered the action"
    tag: string;
}

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('itemAnimation', [
            transition(':enter', useAnimation(flipInX))
        ])
    ]
})
export class QuizListComponent implements OnInit {
    @AutoUnsubscribe private searchSubscription: Subscription;
    @ViewChild('nbSearch') searchCmp: any;

    quizList$: Observable<QuizMetaListItem[]>;
    private searchQueryControlSubject = new BehaviorSubject<string>('');
    searchQuery$: Observable<string>;

    constructor(private quizService: QuizService, private searchService: NbSearchService) {
    }

    ngOnInit() {
        this.searchQuery$ = merge(
            this.searchQueryControlSubject,
            this.searchService.onSearchSubmit().pipe(
                startWith({ term: '', tag: null }),
                map((q: SearchQuery) => q.term)
            )
        );

        this.quizList$ = combineLatest(
            this.quizService.loadQuizList(),
            this.searchQuery$
        ).pipe(
            map(([quizList, query]: [QuizMetaListItem[], string]) => quizList.filter((quiz: QuizMetaListItem) =>
                quiz.shortName.includes(query) || quiz.name.includes(query) || quiz.description.includes(query) ||
                    quiz.descriptionFull.includes(query)
            ))
        );
    }

    resetQuery() {
        this.searchQueryControlSubject.next('');
    }
}
