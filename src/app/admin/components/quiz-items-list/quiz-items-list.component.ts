/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { QuizMetaAdmin, QuizItemAdmin, ItemId, QuizId } from 'ngrx-quiz-common';
import { QuizAdminService } from '../../services/quiz-admin.service';

@Component({
    selector: 'app-quiz-items-list',
    templateUrl: './quiz-items-list.component.html',
    styleUrls: ['./quiz-items-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItemsListComponent implements OnInit {
    quizMeta$: Observable<QuizMetaAdmin>;

    constructor(private route: ActivatedRoute, private toastrService: NbToastrService,
                private quizAdminService: QuizAdminService) {
    }

    ngOnInit() {
        this.quizMeta$ = this.route.params.pipe(
            switchMap((params: Params) => this.quizAdminService.loadQuiz(params.quizId))
        );
    }

    moveItemUp(quizMeta: QuizMetaAdmin, item: QuizItemAdmin): void {
        const idx = quizMeta.items.indexOf(item);
        if (idx > 0) {
            this.saveItemsOrder(quizMeta.id, item.id, quizMeta.items[idx - 1].id);
            quizMeta.items.splice(idx - 1, 2, item, quizMeta.items[idx - 1]);
        }
    }

    moveItemDown(quizMeta: QuizMetaAdmin, item: QuizItemAdmin): void {
        const idx = quizMeta.items.indexOf(item);
        if (idx < quizMeta.items.length - 1) {
            this.saveItemsOrder(quizMeta.id, quizMeta.items[idx + 1].id, item.id);
            quizMeta.items.splice(idx, 2, quizMeta.items[idx + 1], item);
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
}
