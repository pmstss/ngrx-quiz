/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-auth-title',
    templateUrl: './auth-title.component.html',
    styleUrls: ['./auth-title.component.scss']
})
export class AuthTitleComponent implements OnInit {
    title$: Observable<string>;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.title$ = this.route.data.pipe(map(data => data.title));
    }
}
