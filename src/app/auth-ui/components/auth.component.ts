/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'nb-auth',
    styleUrls: ['./auth.component.scss'],
    templateUrl: './auth.component.html'
})
export class CustomNbAuthComponent {
    constructor(protected location: Location) {
    }

    back() {
        this.location.back();
        return false;
    }
}
