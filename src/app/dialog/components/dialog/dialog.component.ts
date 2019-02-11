import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { NbDialogRef } from '@nebular/theme';
import { jackInTheBox, hinge } from 'ng-animate';

export class ButtonConfig {
    label = 'Yes';
    clazz = 'btn-primary';
    callback = () => {};
}

const ANIMATION_DURATION = 1000;

@Component({
    selector: 'modal-content',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('dialogAnimation', [
            transition(':enter', useAnimation(jackInTheBox)),
            transition('* => closed', useAnimation(hinge))
        ])
    ]
})
export class DialogComponent {
    title: string = 'Confirm';
    message: string = 'Are you sure?';
    closed = false;

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
        this.closed = true;
        setTimeout(() => this.dialogRef.close(), ANIMATION_DURATION);
    }

    buttonClick(button: ButtonConfig) {
        button.callback();
        this.close();
    }

    done($event) {
        console.log($event);
    }
}
