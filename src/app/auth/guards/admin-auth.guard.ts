import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from '../../store';
import { User } from '../../core';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(private appStore: Store<AppState>) {
    }

    canActivate(): Observable<boolean> {
        return this.appStore.select(selectUser).pipe(map((u: User) => u && u.admin));
    }
}
