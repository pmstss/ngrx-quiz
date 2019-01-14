import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizMetaAdmin } from '../../types/quiz-meta-admin';
import { quillToolbarConfig } from '../quill-config';
import { DialogService } from '../../../dialog';

@Component({
    selector: 'app-quiz-meta-editor',
    templateUrl: './quiz-meta-editor.component.html',
    styleUrls: ['./quiz-meta-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizMetaEditorComponent implements OnInit {
    @ViewChild('form') public form: NgForm;
    quizMeta$: Observable<QuizMetaAdmin>;
    quillToolbarConfig = quillToolbarConfig;

    constructor(private route: ActivatedRoute, private router: Router,
                private changeDetectorRef: ChangeDetectorRef, private toastrService: NbToastrService,
                private quizAdminService: QuizAdminService, private dialogService: DialogService) {
    }

    ngOnInit() {
        this.quizMeta$ = this.route.params.pipe(
            flatMap(params => (params.quizId === 'new' ? from([<QuizMetaAdmin><any>{
                randomizeItems: false,
                timeLimit: 30
            }]) : this.quizAdminService.loadQuiz(params.quizId)))
        );
    }

    isNew(quizMeta: QuizMetaAdmin) {
        return quizMeta && !quizMeta.id;
    }

    save(quizMeta: QuizMetaAdmin) {
        if (this.isNew(quizMeta)) {
            this.quizAdminService.createQuiz(quizMeta).subscribe((qm: QuizMetaAdmin) => {
                this.toastrService.show(`Quiz "${qm.shortName}", id: ${qm.id}`, 'Quiz created!');
                this.router.navigate([`/admin/quiz/${qm.id}`]);
            });
        } else {
            this.quizAdminService.updateQuiz(quizMeta).subscribe((qm: QuizMetaAdmin) => {
                this.toastrService.show(`Quiz "${qm.shortName}", id: ${qm.id}`, 'Quiz updated!');
                this.form.form.markAsPristine();
                this.changeDetectorRef.detectChanges();
            });
        }
    }

    remove(quizMeta: QuizMetaAdmin) {
        this.dialogService.confirm('Do you really want to remove whole quiz? Action can\'t be undone')
            .subscribe((comfirmed) => {
                if (!comfirmed) {
                    return;
                }

                if (this.isNew(quizMeta)) {
                    this.toastrService.show('Unsaved quiz removed', 'Quiz removed');
                    this.router.navigate(['/admin/quizes']);
                } else {
                    this.quizAdminService.deleteQuiz(quizMeta.id).subscribe(() => {
                        this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz removed');
                        this.router.navigate(['/admin/quizes']);
                    });
                }
            });
    }
}
