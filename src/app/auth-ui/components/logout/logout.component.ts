import { Component } from '@angular/core';
import { NbLogoutComponent } from '@nebular/auth';

@Component({
    selector: 'custom-nb-logout',
    templateUrl: './logout.component.html'
})
export class CustomNbLogoutComponent extends NbLogoutComponent {
}
