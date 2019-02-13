/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizMetaListItem } from 'ngrx-quiz-common';
import { QuizAdminService } from '../../services/quiz-admin.service';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizListComponent implements OnInit {
    quizList$: Observable<QuizMetaListItem[]>;

    constructor(private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizList$ = this.quizAdminService.loadQuizList();
    }
}
