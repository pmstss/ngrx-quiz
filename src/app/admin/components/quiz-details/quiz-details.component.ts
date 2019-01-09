import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';

@Component({
    selector: 'app-quiz-details',
    templateUrl: './quiz-details.component.html',
    styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
    quizId: string;
    quizMeta$: Observable<QuizMetaAdmin>;

    constructor(private route: ActivatedRoute, private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMeta$ = this.route.params.pipe(
            tap(params => this.quizId = params.quizId),
            flatMap(params => this.quizAdminService.loadQuiz(params.quizId))
        );
    }
}
