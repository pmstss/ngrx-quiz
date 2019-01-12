import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { AutoUnsubscribe } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';
import { quillToolbarConfig } from '../quill-config';

@Component({
    selector: 'app-quiz-meta-editor',
    templateUrl: './quiz-meta-editor.component.html',
    styleUrls: ['./quiz-meta-editor.component.scss']
})
export class QuizMetaEditorComponent implements OnInit {
    quizMeta: QuizMetaAdmin;
    @AutoUnsubscribe quizMetaSubscription: Subscription;
    quillToolbarConfig = quillToolbarConfig;

    constructor(private route: ActivatedRoute, private router: Router,
                private toastrService: NbToastrService,
                private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMetaSubscription = this.route.params.pipe(
            flatMap(params => (params.quizId === 'new' ? from([<QuizMetaAdmin><any>{
                    randomizeItems: false,
                    timeLimit: 30
                }]) : this.quizAdminService.loadQuiz(params.quizId))
            )
        ).subscribe(quizMeta =>  this.quizMeta = quizMeta);
    }

    isNew() {
        return this.quizMeta && !this.quizMeta.id;
    }

    save() {
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

    remove() {
        if (this.isNew()) {
            this.toastrService.show('Unsaved quiz removed', 'Quiz removed');
            this.router.navigate(['/admin/quizes']);
        } else {
            this.quizAdminService.deleteQuiz(this.quizMeta.id).subscribe((quizMeta: QuizMetaAdmin) => {
                this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz removed');
                this.router.navigate(['/admin/quizes']);
            });
        }
    }
}
