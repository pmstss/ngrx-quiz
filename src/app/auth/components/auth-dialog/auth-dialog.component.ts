import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { NbTokenService, NbPasswordAuthStrategy } from '@nebular/auth';
import { CAPTCHA_KEY } from '../../../consts';
import { MessageService } from '../../../core';
import { AnonymousAuthService } from '../../services/anonymous-auth.service';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
    captchaKey = CAPTCHA_KEY;
    showCaptcha: boolean = false;
    private captchaToken: string;

    constructor(private dialogRef: NbDialogRef<any>, private router: Router,
                private authService: AnonymousAuthService, private messageService: MessageService) {}

    close(res?: any) {
        this.dialogRef.close(res);
    }

    anonymous() {
        this.showCaptcha = true;
    }

    anonymousLogin() {
        this.authService.anonymousLogin(this.captchaToken).subscribe(
            () => {
                this.close({ anonymous: true });
                this.messageService.success('Hello, anonymous!', 'Auth');
            },
            () => this.messageService.error('Something went wrong')
        );
    }

    login() {
        this.close({ loginRedirect: true });
        this.router.navigateByUrl('/auth/login');
    }

    cancelCaptcha() {
        this.showCaptcha = false;
    }

    handleSuccess(token: string) {
        this.captchaToken = token;
    }
}
