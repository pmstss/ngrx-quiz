import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { QuizMetaListItem } from 'ngrx-quiz-common';
import { QuizService } from '../../../core';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizListComponent implements OnInit {
    quizList$: Observable<QuizMetaListItem[]>;

    constructor(private quizService: QuizService, private toastrService: NbToastrService) {
    }

    ngOnInit() {
        this.quizList$ = this.quizService.loadQuizList();
    }
}
