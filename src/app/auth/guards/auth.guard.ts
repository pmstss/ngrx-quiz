import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from '../../store';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private appStore: Store<AppState>) {
    }

    canActivate(): Observable<boolean | UrlTree> {
        return this.appStore.select(selectUser).pipe(
            map(user => user ? true : this.router.parseUrl('/auth/login'))
        );
    }
}
