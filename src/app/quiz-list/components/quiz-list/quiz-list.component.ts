import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizMeta, AutoUnsubscribe, QuizService } from '../../../core';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
    @AutoUnsubscribe quizList: Observable<QuizMeta[]>;

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        console.log('### QuizListComponent onInit');
        this.quizList = this.quizService.loadQuizList();
    }
}
