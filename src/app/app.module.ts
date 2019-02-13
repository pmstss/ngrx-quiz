/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeService, NbThemeModule, NbLayoutModule, NbMenuModule, NbContextMenuModule,
    NbDialogModule } from '@nebular/theme';
import { BASE_URL_TOKEN, BASE_URL } from './consts';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AppRoutingModule } from './app-routing';
import { AppStoreModule } from './store';
import { DialogModule } from './dialog';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbLayoutModule,
        NbMenuModule.forRoot(),
        NbDialogModule.forRoot(),
        NbContextMenuModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        AppStoreModule,
        DialogModule,
        AuthModule
    ],
    providers: [
        NbThemeService,
        {
            provide: BASE_URL_TOKEN,
            useValue: BASE_URL
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
