/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbResetPasswordComponent } from '@nebular/auth';

@Component({
    selector: 'custom-nb-reset-password-page',
    styleUrls: ['./reset-password.component.scss'],
    templateUrl: './reset-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomNbResetPasswordComponent extends NbResetPasswordComponent {
}
