/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy, VERSION } from '@angular/core';

@Component({
    selector: 'app-about-credits',
    templateUrl: './about-credits.component.html',
    styleUrls: ['./about-credits.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutCreditsComponent implements OnInit {
    ngVersion = VERSION;

    constructor() { }

    ngOnInit() {
    }
}
