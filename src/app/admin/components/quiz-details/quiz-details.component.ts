import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';

@Component({
    selector: 'app-quiz-details',
    templateUrl: './quiz-details.component.html',
    styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
    quizMeta$: Observable<QuizMetaAdmin>;

    constructor(private route: ActivatedRoute, private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMeta$ = this.route.params.pipe(
            flatMap(params => this.quizAdminService.loadQuiz(params.quizId))
        );
    }
}
