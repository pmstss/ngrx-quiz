import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NbToastrService } from '@nebular/theme';
import { NbTokenService, NbAuthToken } from '@nebular/auth';
import { MessageService } from './core/services/message.service';
import { AppState, ActionTokenChanged } from './store';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(appStore: Store<AppState>, tokenService: NbTokenService,
                messageService: MessageService, toastrService: NbToastrService) {
        messageService.messages$.subscribe((msg) => {
            toastrService.show(msg.message, msg.title, {
                status: msg.status,
                duration: msg.duration
            });
        });

        tokenService.tokenChange().subscribe((nbAuthToken: NbAuthToken) => {
            console.log('### token changed: %o', nbAuthToken);
            appStore.dispatch(new ActionTokenChanged({
                token: nbAuthToken.getValue(),
                tokenPayload: nbAuthToken.getPayload()
            }));
        });
    }
}
