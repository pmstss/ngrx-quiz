import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { AutoUnsubscribe, QuizId } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';

@Component({
    selector: 'app-quiz-items-list',
    templateUrl: './quiz-items-list.component.html',
    styleUrls: ['./quiz-items-list.component.scss']
})
export class QuizItemsListComponent implements OnInit {
    quizId: QuizId;
    quizMeta: QuizMetaAdmin;
    @AutoUnsubscribe quizMetaSubscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router,
                private toastrService: NbToastrService,
                private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMetaSubscription = this.route.params.pipe(
            flatMap((params: Params) => this.quizAdminService.loadQuiz(params.quizId))
        ).subscribe((quizMeta) => {
            this.quizMeta = quizMeta;
            this.quizId = quizMeta.id;
        });
    }
}
