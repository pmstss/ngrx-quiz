import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbThemeService, NbThemeModule, NbLayoutModule, NbToastrModule,
        NbGlobalLogicalPosition } from '@nebular/theme';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppStoreModule } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from './dialog';

@NgModule({
    declarations: [
        AppComponent, LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        AppStoreModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'cosmic' }),
        NbLayoutModule,
        NbToastrModule.forRoot({ position: NbGlobalLogicalPosition.BOTTOM_END }),
        DialogModule
    ],
    providers: [NbThemeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
