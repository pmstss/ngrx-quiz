import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { User } from 'ngrx-quiz-common';
import { AppState, selectUser } from '../../../store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user$: Observable<User>;

    items: NbMenuItem[] = [
        { title: 'Profile', data: { id: 'profile' } },
        { title: 'Logout', link: '/auth/logout' }
    ];

    constructor(private appStore: Store<AppState>, private nbMenuService: NbMenuService) {
    }

    ngOnInit() {
        this.user$ = this.appStore.select(selectUser).pipe(
            map(user => {
                console.log(user);
                return user && user.anonymous ? null : user;
            })
        );

        this.nbMenuService.onItemClick().pipe(
            filter(({ tag, item: { data } }) => tag === 'user-context-menu' && data && data.id === 'profile')
        ).subscribe(item => alert('Profile click!'));
    }
}
