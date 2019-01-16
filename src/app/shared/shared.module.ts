import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbSpinnerModule, NbUserModule, NbContextMenuModule } from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BackLinkComponent } from './components/back-link/back-link.component';

@NgModule({
    declarations: [HeaderComponent, LoaderComponent, BackLinkComponent],
    imports: [
        CommonModule,
        RouterModule,
        NbSpinnerModule,
        NbUserModule,
        NbContextMenuModule
    ],
    exports: [HeaderComponent, LoaderComponent, BackLinkComponent]
})
export class SharedModule { }
