/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-back-link',
    templateUrl: './back-link.component.html',
    styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent implements OnInit {
    @Input() url: string;

    constructor() { }

    ngOnInit() {
    }
}
