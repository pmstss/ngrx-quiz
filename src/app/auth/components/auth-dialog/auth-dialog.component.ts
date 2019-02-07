import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { NbTokenService, NbPasswordAuthStrategy } from '@nebular/auth';
import { MessageService } from '../../../core';
import { AnonymousAuthService } from '../../services/anonymous-auth.service';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
    constructor(private dialogRef: NbDialogRef<any>, private router: Router,
                private authService: AnonymousAuthService, private messageService: MessageService,
                private tokenService: NbTokenService, private authStrategy: NbPasswordAuthStrategy) {}

    close(res?: any) {
        this.dialogRef.close(res);
    }

    anonymous() {
        this.authService.anonymousLogin().subscribe((res) => {
            this.close({ anonymous: true });
            this.tokenService.set(this.authStrategy.createToken(res.token));
            this.messageService.success('Hello, anonymous!', 'Auth');
        });
    }

    login() {
        this.close({ loginRedirect: true });
        this.router.navigateByUrl('/auth/login');
    }
}
