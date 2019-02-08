import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-about-version',
    templateUrl: './about-version.component.html',
    styleUrls: ['./about-version.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutVersionComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
