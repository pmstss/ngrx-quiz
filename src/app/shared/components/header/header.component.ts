import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectUser } from '../../../store';
import { User } from '../../../auth';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user$: Observable<User>;

    constructor(private appStore: Store<AppState>) {
        this.user$ = this.appStore.select(selectUser).pipe(
            tap(u => console.log('### user: ', u))
        );
    }
}
