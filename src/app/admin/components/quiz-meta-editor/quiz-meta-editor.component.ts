/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { QuizMetaAdmin, QuizId } from 'ngrx-quiz-common';
import { QuizAdminService } from '../../services/quiz-admin.service';
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
            switchMap(params => (params.quizId === 'new' ? from([<QuizMetaAdmin><any>{
                randomizeItems: false,
                timeLimit: 30
            }]) : this.quizAdminService.loadQuiz(params.quizId)))
        );
    }

    isNew(quizMeta: QuizMetaAdmin) {
        return quizMeta && !quizMeta.id;
    }

    private navigateToQuizList() {
        return this.router.navigate(['../..'], { relativeTo: this.route });
    }

    private navigateToQuiz(quizId: QuizId) {
        return this.router.navigate([`../${quizId}`], { relativeTo: this.route });
    }

    save(quizMeta: QuizMetaAdmin) {
        const meta = { ...quizMeta };
        delete meta.items;

        if (this.isNew(quizMeta)) {
            this.quizAdminService.createQuiz(meta).subscribe((qm: QuizMetaAdmin) => {
                this.toastrService.show(`Quiz "${qm.shortName}", id: ${qm.id}`, 'Quiz created!');
                this.navigateToQuiz(qm.id);
            });
        } else {
            this.quizAdminService.updateQuiz(meta).subscribe((qm: QuizMetaAdmin) => {
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
                    this.navigateToQuizList();
                } else {
                    this.quizAdminService.deleteQuiz(quizMeta.id).subscribe(() => {
                        this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz removed');
                        this.navigateToQuizList();
                    });
                }
            });
    }

    publish(quizMeta: QuizMetaAdmin) {
        this.dialogService.confirm('Do you really want to publish this quiz?')
            .subscribe((comfirmed) => {
                if (!comfirmed) {
                    return;
                }

                this.quizAdminService.publishQuiz(quizMeta.id).subscribe(() => {
                    this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz published');
                    this.navigateToQuizList();
                });
            });
    }

    unpublish(quizMeta: QuizMetaAdmin) {
        this.dialogService.confirm('Do you really want to unpublish this quiz?')
            .subscribe((comfirmed) => {
                if (!comfirmed) {
                    return;
                }

                this.quizAdminService.unpublishQuiz(quizMeta.id).subscribe(() => {
                    this.toastrService.show(`Quiz "${quizMeta.shortName}", id: ${quizMeta.id}`, 'Quiz unpublished');
                    this.navigateToQuizList();
                });
            });
    }
}
