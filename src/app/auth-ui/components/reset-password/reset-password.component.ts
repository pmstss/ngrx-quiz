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
