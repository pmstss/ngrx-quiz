/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';

@Component({
    selector: 'custom-nb-request-password-page',
    styleUrls: ['./request-password.component.scss'],
    templateUrl: './request-password.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomNbRequestPasswordComponent extends NbRequestPasswordComponent {
}
