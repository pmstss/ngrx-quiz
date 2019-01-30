import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NbToastrService } from '@nebular/theme';
import { NbTokenService, NbAuthToken, NbAuthJWTToken } from '@nebular/auth';
import { MessageService } from './core/services/message.service';
import { AppState, ActionTokenChanged } from './store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private appStore: Store<AppState>, private messageService: MessageService,
                private toastrService: NbToastrService, private nbTokenService: NbTokenService,
                private router: Router, private tokenService: NbTokenService) {
    }

    ngOnInit() {
        this.messageService.messages$.subscribe((msg) => {
            this.toastrService.show(msg.message, msg.title, {
                status: msg.status,
                duration: msg.duration
            });
        });

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
                    this.router.navigateByUrl('/quizes');
                }
            },
            false
        );
    }
}
