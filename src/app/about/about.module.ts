/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbRouteTabsetModule } from '@nebular/theme';
import { SharedModule } from '../shared';
import { AboutComponent } from './components/about/about.component';
import { AboutProjectComponent } from './components/about-project/about-project.component';
import { AboutAuthorComponent } from './components/about-author/about-author.component';
import { AboutCreditsComponent } from './components/about-credits/about-credits.component';

@NgModule({
    declarations: [AboutComponent, AboutProjectComponent, AboutAuthorComponent, AboutCreditsComponent],
    imports: [
        SharedModule,
        NbRouteTabsetModule,
        RouterModule.forChild([{
            path: '',
            component: AboutComponent,
            children: [
                {
                    path: 'project',
                    component: AboutProjectComponent
                }, {
                    path: 'author',
                    component: AboutAuthorComponent
                }, {
                    path: 'credits',
                    component: AboutCreditsComponent
                },
                {
                    path: '**',
                    redirectTo: 'project'
                }
            ]
        }])
    ]
})
export class AboutModule { }
