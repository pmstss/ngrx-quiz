/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { useAnimation, trigger, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { slideInDown, slideInUp } from 'ng-animate';
import { QuizMetaListItem, QuizId } from 'ngrx-quiz-common';
import { QuizAdminService } from '../../services/quiz-admin.service';

const UP_DOWN_DURATION = 350;

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [trigger('quizAnimation', [
        transition('* => up', useAnimation(slideInDown, { params: { timing: UP_DOWN_DURATION / 1000 } })),
        transition('* => down', useAnimation(slideInUp, { params: { timing: UP_DOWN_DURATION / 1000 } }))
    ])]
})
export class QuizListComponent implements OnInit {
    quizList$: Observable<QuizMetaListItem[]>;

    constructor(private cdr: ChangeDetectorRef, private toastrService: NbToastrService,
                private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizList$ = this.quizAdminService.loadQuizList();
    }

    private setUpDownFlags(itemUp: any, itemDown: any) {
        itemUp.up = true;
        itemDown.down = true;
    }

    private clearUpDownFlags(itemUp: any, itemDown: any) {
        delete itemUp.up;
        delete itemDown.down;
        this.cdr.detectChanges();
    }

    moveQuizUp(quizList: QuizMetaListItem[], idx: number): void {
        if (idx === 0) {
            return;
        }

        const quiz = quizList[idx];
        const itemUp = quiz;
        const itemDown = quizList[idx - 1];
        this.setUpDownFlags(itemUp, itemDown);
        quizList.splice(idx - 1, 2, itemUp, itemDown);
        setTimeout(
            () => {
                this.clearUpDownFlags(itemUp, itemDown);
                this.saveOrder(itemUp.id, itemDown.id);
            },
            UP_DOWN_DURATION + 200
        );
    }

    moveQuizDown(quizList: QuizMetaListItem[], idx: number): void {
        if (idx >= quizList.length - 1) {
            return;
        }

        const quiz = quizList[idx];
        const itemUp = quizList[idx + 1];
        const itemDown = quiz;
        this.setUpDownFlags(itemUp, itemDown);
        quizList.splice(idx, 2, itemUp, itemDown);
        setTimeout(
            () => {
                this.clearUpDownFlags(itemUp, itemDown);
                this.saveOrder(itemUp.id, itemDown.id);
            },
            UP_DOWN_DURATION + 200
        );
    }

    private saveOrder(quizIdUp: QuizId, quizIdDown: QuizId) {
        this.quizAdminService.updateQuizOrder(quizIdUp, quizIdDown).subscribe(() => {
            this.toastrService.show('Items order has been changed successfully', 'Quiz updated!');
        });
    }

    trackById(idx: number, obj: any) {
        return (obj.down || obj.up) ?  `${obj.id}_active` : obj.id;
    }
}
