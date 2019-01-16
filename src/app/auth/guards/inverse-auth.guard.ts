import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from '../../store';

@Injectable()
export class InverseAuthGuard implements CanActivate {
    constructor(private appStore: Store<AppState>) {
    }

    canActivate(): Observable<boolean> {
        return this.appStore.select(selectUser).pipe(map(v => !v));
    }
}
