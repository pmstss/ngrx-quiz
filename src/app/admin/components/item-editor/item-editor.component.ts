import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from '../../../core';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { QuizItemAdmin } from '../../types/quiz-item-admin';
import { QuizItemChoiceAdmin } from '../../types/quiz-item-choice-admin';

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
    quizId: string;
    item: QuizItemAdmin;
    @AutoUnsubscribe sub: Subscription;
    explanationState: boolean[] = [];   // TODO separate component?

    constructor(private router: Router, private route: ActivatedRoute, private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
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

    addItem(arg: any) {
        console.log('### addItem - arg: %o, item: %o', arg, this.item);
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

    addChoice(arg: any): void {
        this.item.choices.push(new QuizItemChoiceAdmin());
    }

    toggleCorrect(index: number, e: Event) {
        // TODO ### mark form as dirty
        console.log('### toggleCorrect - index: %o, event: %o', index, event);
        const value = this.item.choices[index].correct;
        this.item.choices[index].correct = !value;
        if (!value && this.item.singleChoice) {
            this.item.choices.forEach((item, idx) => {
                if (idx !== index) {
                    item.correct = false;
                }
            });
        }
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
