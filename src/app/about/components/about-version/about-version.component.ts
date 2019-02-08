import { Component, OnInit, ChangeDetectionStrategy, VERSION } from '@angular/core';

@Component({
    selector: 'app-about-version',
    templateUrl: './about-version.component.html',
    styleUrls: ['./about-version.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutVersionComponent implements OnInit {
    ngVersion = VERSION;

    constructor() { }

    ngOnInit() {
    }
}
