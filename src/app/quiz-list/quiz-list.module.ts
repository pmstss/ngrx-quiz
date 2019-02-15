/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbSearchModule, NbCdkMappingModule } from '@nebular/theme';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { WysiwygModule } from '../wysiwyg';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CustomNbSearchComponent } from './components/custom-nb-search/custom-nb-search.component';
import { CustomNbSearchFieldComponent } from './components/custom-nb-search-field/custom-nb-search-field.component';

@NgModule({
    declarations: [QuizListComponent, CustomNbSearchComponent, CustomNbSearchFieldComponent],
    imports: [
        CoreModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: QuizListComponent
            }
        ]),
        NbCdkMappingModule, // for NbPortal/CdkPortal (*nbPortal directive used in nb-search)
        NbCardModule,
        NbSearchModule,
        SharedModule,
        WysiwygModule
    ],
    providers: []
})
export class QuizListModule { }
