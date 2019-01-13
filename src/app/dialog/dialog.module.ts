import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbDialogModule } from '@nebular/theme';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from '../dialog/services/dialog.service';

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        NbDialogModule.forRoot(),
        NbCardModule
    ],
    entryComponents: [DialogComponent],
    exports: [],
    providers: [DialogService]
})
export class DialogModule {
}
