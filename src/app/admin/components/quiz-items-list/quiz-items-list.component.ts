/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, useAnimation, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { QuizMetaAdmin, QuizItemAdmin, ItemId, QuizId } from 'ngrx-quiz-common';
import { QuizAdminService } from '../../services/quiz-admin.service';
import { slideInUp, slideInDown } from 'ng-animate';

const UP_DOWN_DURATION = 350;

@Component({
    selector: 'app-quiz-items-list',
    templateUrl: './quiz-items-list.component.html',
    styleUrls: ['./quiz-items-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [trigger('itemAnimation', [
        transition('* => up', useAnimation(slideInDown, { params: { timing: UP_DOWN_DURATION / 1000 } })),
        transition('* => down', useAnimation(slideInUp, { params: { timing: UP_DOWN_DURATION / 1000 } }))
    ])]
})
export class QuizItemsListComponent implements OnInit {
    quizMeta$: Observable<QuizMetaAdmin>;

    constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef,
                private toastrService: NbToastrService, private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMeta$ = this.route.params.pipe(
            switchMap((params: Params) => this.quizAdminService.loadQuiz(params.quizId))
        );
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

    moveItemUp(quizMeta: QuizMetaAdmin, item: QuizItemAdmin): void {
        const idx = quizMeta.items.indexOf(item);
        if (idx > 0) {
            const itemUp = item;
            const itemDown = quizMeta.items[idx - 1];
            this.setUpDownFlags(itemUp, itemDown);
            quizMeta.items.splice(idx - 1, 2, itemUp, itemDown);
            setTimeout(
                () => {
                    this.clearUpDownFlags(itemUp, itemDown);
                    this.saveItemsOrder(quizMeta.id, itemUp.id, itemDown.id);
                },
                UP_DOWN_DURATION + 200
            );
        }
    }

    moveItemDown(quizMeta: QuizMetaAdmin, item: QuizItemAdmin): void {
        const idx = quizMeta.items.indexOf(item);
        if (idx < quizMeta.items.length - 1) {
            const itemUp = quizMeta.items[idx + 1];
            const itemDown = item;
            this.setUpDownFlags(itemUp, itemDown);
            quizMeta.items.splice(idx, 2, itemUp, itemDown);
            setTimeout(
                () => {
                    this.clearUpDownFlags(itemUp, itemDown);
                    this.saveItemsOrder(quizMeta.id, itemUp.id, itemDown.id);
                },
                UP_DOWN_DURATION + 200
            );
        }
    }

    private saveItemsOrder(quizId: QuizId, itemIdUp: ItemId, itemIdDown: ItemId): void {
        this.quizAdminService.updateQuizItemsOrder(
            quizId,
            itemIdUp,
            itemIdDown
        ).subscribe(() => {
            this.toastrService.show('Items order has been changed successfully', 'Quiz updated!');
        });
    }

    trackById(idx: number, obj: any) {
        return (obj.down || obj.up) ?  `${obj.id}_active` : obj.id;
    }
}
