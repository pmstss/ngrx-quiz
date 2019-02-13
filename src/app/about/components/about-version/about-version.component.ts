/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
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
