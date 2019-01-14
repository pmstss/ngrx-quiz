import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { AutoUnsubscribe, QuizId } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizItemAdmin } from '../../types/quiz-item-admin';
import { QuizItemChoiceAdmin } from '../../types/quiz-item-choice-admin';
import { quillToolbarConfig } from '../quill-config';
import { DialogService } from 'src/app/dialog/services/dialog.service';

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
            flatMap(
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

    save() {
        if (this.isNew()) {
            this.quizAdminService.createItem(this.quizId, this.item).subscribe((quizItem) => {
                this.toastrService.show(`Item id: ${quizItem.id}`, 'Item created!');
                this.router.navigate([`/admin/quiz/${this.quizId}/items/${quizItem.id}`]);
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
                    this.router.navigate([`/admin/quiz/${this.quizId}/items`]);
                } else {
                    this.quizAdminService.deleteItem(this.item.id).subscribe((quizItem: QuizItemAdmin) => {
                        this.toastrService.show(`Item id: ${quizItem.id}`, 'Item removed');
                        this.router.navigate([`/admin/quiz/${this.quizId}/items`]);
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
