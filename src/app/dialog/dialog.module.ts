/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbDialogModule } from '@nebular/theme';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from '../dialog/services/dialog.service';

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        NbDialogModule,
        NbCardModule
    ],
    entryComponents: [DialogComponent],
    exports: [],
    providers: [DialogService]
})
export class DialogModule {
}
