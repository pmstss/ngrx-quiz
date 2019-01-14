import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbSpinnerModule } from '@nebular/theme';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [HeaderComponent, LoaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        NbSpinnerModule
    ],
    exports: [HeaderComponent, LoaderComponent]
})
export class SharedModule { }
