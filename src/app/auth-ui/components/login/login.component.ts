import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
    selector: 'custom-nb-login',
    templateUrl: './login.component.html',
})
export class CustomNbLoginComponent extends NbLoginComponent {
}
