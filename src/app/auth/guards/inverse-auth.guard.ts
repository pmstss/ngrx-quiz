/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from '../../store';

@Injectable()
export class InverseAuthGuard implements CanActivate {
    constructor(private appStore: Store<AppState>) {
    }

    canActivate(): Observable<boolean> {
        return this.appStore.select(selectUser).pipe(map(u => !u || u.anonymous));
    }
}
