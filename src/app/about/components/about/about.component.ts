/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
    tabs = [
        {
            title: 'Project',
            route: '/about/project',
            icon: 'nb-home',
            responsive: true
        },
        {
            title: 'Author',
            route: '/about/author',
            icon: 'nb-person',
            responsive: true
        },
        {
            title: 'Version',
            route: '/about/version',
            icon: 'nb-heart',
            responsive: true
        }
    ];

    constructor() { }

    ngOnInit() {
    }
}
