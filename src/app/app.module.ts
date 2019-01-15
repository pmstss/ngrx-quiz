import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeService, NbThemeModule, NbLayoutModule, NbToastrModule,
        NbGlobalLogicalPosition } from '@nebular/theme';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AppRoutingModule } from './app-routing';
import { AppStoreModule } from './store';
import { DialogModule } from './dialog';
import { AuthModule } from './auth';
import { AppComponent } from './app.component';

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
        NbToastrModule.forRoot({ position: NbGlobalLogicalPosition.BOTTOM_END }),
        AppRoutingModule,
        CoreModule,
        SharedModule,
        AppStoreModule,
        AuthModule,
        DialogModule
    ],
    providers: [NbThemeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
