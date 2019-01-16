import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { AppState, selectUser } from '../../../store';
import { User } from '../../../core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user$: Observable<User>;

    items: NbMenuItem[] = [
        { title: 'Profile', data: { id: 'profile' } },
        { title: 'Logout', link: '/auth/logout' },
    ];

    constructor(private appStore: Store<AppState>, private nbMenuService: NbMenuService) {
    }

    ngOnInit() {
        this.user$ = this.appStore.select(selectUser);

        this.nbMenuService.onItemClick().pipe(
            tap(tmp => console.log(tmp)),
            filter(({ tag, item: { data } }) => tag === 'user-context-menu' && data && data.id === 'profile'),
        ).subscribe(item => alert('Profile click!'));
    }
}
