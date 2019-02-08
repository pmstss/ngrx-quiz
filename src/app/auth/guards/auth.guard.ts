import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'ngrx-quiz-common';
import { AppState, selectUser } from '../../store';
import { AuthDialogService } from '../services/auth-dialog.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private appStore: Store<AppState>,
                private authDialogService: AuthDialogService) {
    }

    canActivate(): Observable<boolean | UrlTree> {
        return this.appStore.select(selectUser).pipe(
            switchMap((user: User) => {
                if (user) {
                    return of(true);
                }

                return this.authDialogService.pleaseLogin().pipe(
                    map((res: any) => res && res.anonymous)
                );
            })
        );
    }
}
