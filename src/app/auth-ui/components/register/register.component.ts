/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
    selector: 'custom-nb-register',
    templateUrl: './register.component.html'
})
export class CustomNbRegisterComponent extends NbRegisterComponent {
}
