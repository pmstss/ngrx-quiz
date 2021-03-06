/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { QuizId, QuizItemAdmin, QuizItemChoiceAdmin } from 'ngrx-quiz-common';
import { AutoUnsubscribe } from '../../../core';
import { DialogService } from '../../../dialog';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { quillToolbarConfig } from '../quill-config';

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
    @AutoUnsubscribe quizMetaSubscription: Subscription;
    @ViewChild('form') public form: NgForm;

    quizId: QuizId;
    item: QuizItemAdmin;
    explanationState: boolean[] = [];
    quillToolbarConfig = quillToolbarConfig;
    radioIdx: number;

    constructor(private router: Router, private route: ActivatedRoute,
                private toastrService: NbToastrService, private quizAdminService: QuizAdminService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.quizMetaSubscription = this.route.params.pipe(
            switchMap(
                (params: Params): Observable<QuizItemAdmin> => {
                    return params.itemId === 'new' ? from([<QuizItemAdmin><any>{
                        singleChoice: true,
                        randomizeChoices: false,
                        choices: [{ text: '', correct: true }, { text: '', correct: false }]
                    }]) : this.quizAdminService.loadItem(params.itemId);
                },
                (params, quizItem): [Params, QuizItemAdmin] => ([params.quizId, quizItem])
            )
        ).subscribe(([quizId, quizItem]: any[]) => {
            this.quizId = quizId;
            this.item = quizItem;
            this.radioIdx = (this.item.choices || []).findIndex(ch => ch.correct);
        });
    }

    isNew(): boolean {
        return this.item && !this.item.id;
    }

    private navigateToItemsList() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }

    save() {
        if (this.isNew()) {
            this.quizAdminService.createItem(this.quizId, this.item).subscribe((quizItem) => {
                this.toastrService.show(`Item id: ${quizItem.id}`, 'Item created!');
                this.navigateToItemsList();
                this.form.form.markAsPristine();
            });
        } else {
            this.quizAdminService.updateItem(this.item).subscribe((quizItem) => {
                this.toastrService.show(`Item id: ${quizItem.id}`, 'Item updated!');
                this.item = quizItem;
                this.form.form.markAsPristine();
            });
        }
    }

    remove() {
        this.dialogService.confirm('Do you really want to remove this item from quiz?')
            .subscribe((comfirmed) => {
                if (!comfirmed) {
                    return;
                }

                if (this.isNew()) {
                    this.toastrService.show('Unsaved item removed', 'Item removed');
                    this.navigateToItemsList();
                } else {
                    this.quizAdminService.deleteItem(this.item.id).subscribe(() => {
                        this.toastrService.show(`Item id: ${this.item.id}`, 'Item removed');
                        this.navigateToItemsList();
                    });
                }
            });
    }

    addChoice(): void {
        this.item.choices.push(<QuizItemChoiceAdmin>{
            text: '',
            correct: false
        });
    }

    moveChoiceUp(choice: QuizItemChoiceAdmin): void {
        const idx = this.item.choices.indexOf(choice);
        if (idx > 0) {
            this.item.choices.splice(idx - 1, 2, choice, this.item.choices[idx - 1]);
            this.form.form.markAsDirty();
        }
    }

    moveChoiceDown(choice: QuizItemChoiceAdmin): void {
        const idx = this.item.choices.indexOf(choice);
        if (idx < this.item.choices.length - 1) {
            this.item.choices.splice(idx, 2, this.item.choices[idx + 1], choice);
            this.form.form.markAsDirty();
        }
    }

    removeChoice(choice: QuizItemChoiceAdmin): void {
        this.dialogService.confirm('Do you really want to remove choice?')
            .subscribe((comfirmed) => {
                if (!comfirmed) {
                    return;
                }

                this.item.choices.splice(this.item.choices.indexOf(choice), 1);
                this.form.form.markAsDirty();
            });
    }

    onRadioChoiceSelect(idx: number) {
        this.item.choices.forEach(ch => ch.correct = false);
        this.item.choices[idx].correct = true;
    }

    onSingleChoiceChange() {
        if (this.item.singleChoice) {
            this.item.choices.forEach((item) => {
                item.correct = false;
            });
        }
        this.radioIdx = -1;
    }

    shuffle() {
        this.item.choices.sort(() => Math.random() - 0.5);
        this.form.form.markAsDirty();
    }

    toggleExplanation(index: number): void {
        this.explanationState[index] = !this.explanationState[index];
    }

    isExplanationExpanded(index: number): boolean {
        return !!this.explanationState[index];
    }
}
