import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription, empty } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AutoUnsubscribe } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';
import { quillToolbarConfig } from '../quill-config';

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

    constructor(private route: ActivatedRoute, private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMetaSubscription = this.route.params.pipe(
            flatMap(
                (params: Params): Observable<QuizMetaAdmin> => {
                    return params.quizId === 'new' ? empty() :
                        this.quizAdminService.loadQuiz(params.quizId);
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
        console.log('### save - arg: %o, item: %o', arg, this.quizMeta);
        if (this.isNew()) {
            console.log('### going to create quiz with data: %o', this.quizMeta);
            this.quizAdminService.createQuiz(this.quizMeta).subscribe(() => {
                alert('### quiz created');
                // this.router.navigate([`/admin/quiz/${this.quizId}`]);
            });
        } else {
            console.log('### going to update quiz %o with data: %o', this.quizId, this.quizMeta);
            this.quizAdminService.updateQuiz(this.quizMeta).subscribe(() => {
                alert('### quiz updated');
                // this.router.navigate([`/admin/quiz/${this.quizId}`]);
            });
        }
    }
}
