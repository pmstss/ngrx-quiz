/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'ngrx-quiz-common';
import { AppState, selectUser } from '../../store';
import { AuthDialogService } from '../services/auth-dialog.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private appStore: Store<AppState>, private authDialogService: AuthDialogService) {
    }

    canActivate(): Observable<boolean | UrlTree> {
        return this.appStore.select(selectUser).pipe(
            switchMap((user: User) => {
                if (user) {
                    return of(true);
                }

                return this.authDialogService.pleaseLogin().pipe(
                    map((res: any) => !!(res && res.anonymous))
                );
            })
        );
    }
}
