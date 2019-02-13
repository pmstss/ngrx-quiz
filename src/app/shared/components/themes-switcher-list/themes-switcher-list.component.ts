/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Component, Input } from '@angular/core';
import { NbThemeService, NbPopoverDirective } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

@Component({
    selector: 'app-theme-switcher-list',
    templateUrl: 'theme-switcher-list.component.html',
    styleUrls: ['./theme-switcher-list.component.scss']
})
export class ThemeSwitcherListComponent {
    @Input() popover: NbPopoverDirective;

    theme: NbJSThemeOptions;

    themes = [
        {
            title: 'Light',
            key: 'default'
        },
        {
            title: 'Cosmic',
            key: 'cosmic'
        },
        {
            title: 'Corporate',
            key: 'corporate'
        }
    ];

    constructor(private themeService: NbThemeService) { }

    onToggleTheme(themeKey: string) {
        this.themeService.changeTheme(themeKey);
        this.popover.hide();
    }
}
