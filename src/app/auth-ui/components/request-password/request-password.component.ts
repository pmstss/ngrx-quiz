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
