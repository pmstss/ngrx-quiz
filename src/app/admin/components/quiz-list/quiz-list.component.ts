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
