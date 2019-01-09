import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizMeta, QuizService } from '../../../core';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
    quizList: Observable<QuizMeta[]>;
    adminMode = false;

    constructor(private route: ActivatedRoute, private quizService: QuizService) {
        this.route.data.subscribe((data) => {
            this.adminMode = data.admin;
        });
    }

    ngOnInit() {
        console.log('### QuizListComponent onInit');
        this.quizList = this.quizService.loadQuizList();
    }
}
