/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';

@Injectable()
export class AuthDialogService {
    private dialogRef: NbDialogRef<any>;

    constructor (private dialogService: NbDialogService) {
    }

    pleaseLogin(): Observable<any> {
        if (!this.dialogRef) {
            this.dialogRef = this.dialogService.open(AuthDialogComponent, {
                context: {}
            });

            this.dialogRef.onClose.pipe(take(1)).subscribe(() => {
                this.dialogRef = null;
            });
        }

        return this.dialogRef.onClose;
    }
}
