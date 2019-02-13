/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopScoresComponent } from './components/top-scores/top-scores.component';
import { SharedModule } from '../shared';

@NgModule({
    declarations: [TopScoresComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '',
            children: [
                {
                    path: '',
                    component: TopScoresComponent
                },
                {
                    path: ':quizId',
                    component: TopScoresComponent
                }
            ]
        }])
    ]
})
export class RatingModule { }
