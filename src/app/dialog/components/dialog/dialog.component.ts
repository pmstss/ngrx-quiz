import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

export class ButtonConfig {
    label = 'Yes';
    clazz = 'btn-primary';
    callback = () => {};
}

@Component({
    selector: 'modal-content',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    title: string = 'Confirm';
    message: string = 'Are you sure?';

    buttons: ButtonConfig[] = [{
        label: 'Yes',
        clazz: 'btn-primary',
        callback: () => {}
    }, {
        label: 'No',
        clazz: 'btn-default',
        callback: () => {}
    }];

    constructor(private dialogRef: NbDialogRef<any>) {}

    close() {
        this.dialogRef.close();
    }

    buttonClick(button: ButtonConfig) {
        button.callback();
        this.dialogRef.close();
    }
}
