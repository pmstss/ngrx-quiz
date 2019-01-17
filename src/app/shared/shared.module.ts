import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbSpinnerModule, NbUserModule, NbContextMenuModule, NbPopoverModule } from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ThemeSwitcherListComponent } from './components/themes-switcher-list/themes-switcher-list.component';

@NgModule({
    declarations: [
        HeaderComponent, LoaderComponent, BackLinkComponent,
        ThemeSwitcherListComponent, ThemeSwitcherComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NbSpinnerModule,
        NbPopoverModule,
        NbUserModule,
        NbContextMenuModule
    ],
    entryComponents: [ThemeSwitcherListComponent],
    exports: [HeaderComponent, LoaderComponent, BackLinkComponent]
})
export class SharedModule { }
