import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizItemAdmin } from '../../types/quiz-item-admin';
import { QuizItemChoiceAdmin } from '../../types/quiz-item-choice-admin';
import { quillToolbarConfig } from '../quill-config';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
    @AutoUnsubscribe routeSubscription: Subscription;
    @ViewChild('form') public form: NgForm;

    quizId: string;
    item: QuizItemAdmin;
    explanationState: boolean[] = [];
    quillToolbarConfig = quillToolbarConfig;

    constructor(private router: Router, private route: ActivatedRoute, private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe((params) => {
            console.log('### ItemEditorComponent onInit - params: %o', params);

            this.quizId = params.quizId;
            if (params.itemId === 'new') {
                this.item = new QuizItemAdmin();
            } else {
                this.quizAdminService.loadItem(params.itemId).subscribe(item => this.item = item);
            }
        });
    }

    isNew(): boolean {
        return this.item && !this.item.id;
    }

    save(arg: any) {
        console.log('### save - arg: %o, item: %o', arg, this.item);
        if (this.isNew()) {
            this.quizAdminService.createItem(this.quizId, this.item).subscribe(() => {
                this.router.navigate([`/admin/quiz/${this.quizId}`]);
            });
        } else {
            this.quizAdminService.updateItem(this.item).subscribe(() => {
                this.router.navigate([`/admin/quiz/${this.quizId}`]);
            });
        }
    }

    addChoice(): void {
        this.item.choices.push(new QuizItemChoiceAdmin());
    }

    removeChoice(choice): void {
        const idx = this.item.choices.indexOf(choice);
        this.item.choices.splice(idx, 1);
    }

    toggleCorrect(choice: QuizItemChoiceAdmin) {
        choice.correct = !choice.correct;
        if (choice.correct && this.item.singleChoice) {
            this.item.choices
                .filter(ch => ch !== choice)
                .forEach(ch => ch.correct = false);
        }
        this.form.controls['choiceText0'].markAsDirty(); // hack :(
    }

    onSingleChoiceChange() {
        if (this.item.singleChoice) {
            this.item.choices.forEach((item) => {
                item.correct = false;
            });
        }
    }

    toggleExplanation(index: number): void {
        this.explanationState[index] = !this.explanationState[index];
    }

    isExplanationExpanded(index: number): boolean {
        return !!this.explanationState[index];
    }
}
