import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectUserFullName } from '../../../store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userFullName$: Observable<string>;

    constructor(private appStore: Store<AppState>) {
        this.userFullName$ = this.appStore.select(selectUserFullName);
    }

    ngOnInit() {
    }
}
