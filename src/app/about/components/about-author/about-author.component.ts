/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-about-author',
    templateUrl: './about-author.component.html',
    styleUrls: ['./about-author.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAuthorComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
