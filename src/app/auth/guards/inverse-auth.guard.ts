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
