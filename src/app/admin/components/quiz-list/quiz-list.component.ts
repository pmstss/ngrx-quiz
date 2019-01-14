import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizMeta, QuizService } from '../../../core';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizListComponent implements OnInit {
    quizList$: Observable<QuizMeta[]>;

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.quizList$ = this.quizService.loadQuizList();
    }
}
