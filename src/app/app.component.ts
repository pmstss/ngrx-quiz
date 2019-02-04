import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NbTokenService, NbAuthToken, NbAuthJWTToken } from '@nebular/auth';
import { AppState, ActionTokenChanged } from './store';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private appStore: Store<AppState>, private nbTokenService: NbTokenService,
                private router: Router, private tokenService: NbTokenService) {
    }

    ngOnInit() {
        this.nbTokenService.tokenChange().subscribe((nbAuthToken: NbAuthToken) => {
            this.appStore.dispatch(new ActionTokenChanged({
                token: nbAuthToken.getValue(),
                tokenPayload: nbAuthToken.getPayload()
            }));
        });

        window.addEventListener(
            'storage',
            (e) => {
                if (e.key === 'oauthToken' && e.newValue) {
                    this.tokenService.set(new NbAuthJWTToken(e.newValue, 'email'));
                    localStorage.removeItem('oauthToken');
                    this.router.navigateByUrl('/');
                }
            },
            false
        );
    }
}
