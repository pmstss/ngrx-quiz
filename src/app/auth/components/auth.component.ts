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
