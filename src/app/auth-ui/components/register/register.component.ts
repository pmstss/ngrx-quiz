import { Component } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
    selector: 'custom-nb-register',
    templateUrl: './register.component.html'
})
export class CustomNbRegisterComponent extends NbRegisterComponent {
}
