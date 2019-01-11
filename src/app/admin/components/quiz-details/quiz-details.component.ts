import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, empty, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AutoUnsubscribe } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';
import { quillToolbarConfig } from '../quill-config';
import { NbToastrService } from '@nebular/theme';

@Component({
    selector: 'app-quiz-details',
    templateUrl: './quiz-details.component.html',
    styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {
    quizId: string;
    quizMeta: QuizMetaAdmin;
    @AutoUnsubscribe quizMetaSubscription: Subscription;
    quillToolbarConfig = quillToolbarConfig;

    constructor(private route: ActivatedRoute, private router: Router,
                private toastrService: NbToastrService,
                private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMetaSubscription = this.route.params.pipe(
            flatMap(
                (params: Params): Observable<QuizMetaAdmin> => {
                    return params.quizId === 'new' ? from([<QuizMetaAdmin><any>{
                        randomizeQuestions: false,
                        timeLimit: 1800
                    }]) : this.quizAdminService.loadQuiz(params.quizId);
                },
                (params, quizMeta): [Params, QuizMetaAdmin] => ([params, quizMeta])
            )
        ).subscribe(([params, quizMeta]: [Params, QuizMetaAdmin]) => {
            this.quizId = params.quizId;
            this.quizMeta = quizMeta || <QuizMetaAdmin>{};
        });
    }

    isNew() {
        return this.quizId === 'new';
    }

    save(arg: any) {
        if (this.isNew()) {
            this.quizAdminService.createQuiz(this.quizMeta).subscribe((quizMeta: QuizMetaAdmin) => {
                this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz created!');
                this.router.navigate([`/admin/quiz/${quizMeta.id}`]);
            });
        } else {
            this.quizAdminService.updateQuiz(this.quizMeta).subscribe((quizMeta: QuizMetaAdmin) => {
                this.quizMeta = quizMeta;
                this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz updated!');
            });
        }
    }
}
