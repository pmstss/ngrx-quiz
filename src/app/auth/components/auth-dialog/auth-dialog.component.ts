/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { useAnimation, transition, trigger, state, style } from '@angular/animations';
import { NbDialogRef } from '@nebular/theme';
import { RecaptchaComponent } from 'ng-recaptcha';
import { jackInTheBox, hinge } from 'ng-animate';
import { CAPTCHA_KEY } from '../../../consts';
import { MessageService } from '../../../core';
import { AnonymousAuthService } from '../../services/anonymous-auth.service';

const ANIMATION_DURATION = 1000;

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.scss'],
    animations: [
        trigger('dialogAnimation', [
            transition(':enter', useAnimation(jackInTheBox)),
            transition('* => closed', useAnimation(hinge)),
            state('closed', style({
                opacity: 0
            }))
        ])
    ]
})
export class AuthDialogComponent {
    captchaKey = CAPTCHA_KEY;
    showCaptcha: boolean = false;
    closed: boolean = false;

    @ViewChild('captcha') private captchaRef: RecaptchaComponent;
    private captchaToken: string;

    constructor(private dialogRef: NbDialogRef<any>, private router: Router,
                private authService: AnonymousAuthService, private messageService: MessageService) {}

    close(res?: any) {
        this.closed = true;
        setTimeout(() => this.dialogRef.close(res), ANIMATION_DURATION);
    }

    anonymous() {
        this.showCaptcha = true;
    }

    anonymousLogin() {
        this.authService.anonymousLogin(this.captchaToken).subscribe(
            () => this.close({ anonymous: true }),
            () => this.captchaRef.reset()
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
