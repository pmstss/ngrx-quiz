import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { ButtonConfig, DialogComponent } from '../components/dialog/dialog.component';

export type DialogOptions = {
    message: string,
    title?: string,
    buttons?: ButtonConfig[]
};

@Injectable()
export class DialogService {
    constructor (private dialogService: NbDialogService) {
    }

    confirm(options: DialogOptions | string): Observable<boolean> {
        const opts = typeof options === 'string' ? {
            message: options
        } : options;

        return Observable.create((observer: Observer<boolean>) => {
            const ref = this.dialogService.open(DialogComponent, {
                context: Object.assign(
                    {
                        title: 'Confirm',
                        buttons: [{
                            label: 'Yes',
                            clazz: 'btn-danger',
                            callback: () => {
                                observer.next(true);
                                observer.complete();
                            }
                        }, {
                            label: 'No',
                            clazz: 'btn-primary',
                            callback: () => {
                                observer.next(false);
                                observer.complete();
                            }
                        }]
                    },
                    opts
                )
            });

            ref.onClose.pipe(take(1)).subscribe(() => {
                observer.next(false);
                observer.complete();
            });
        });
    }

    alert(options: DialogOptions | string): Observable<boolean> {
        const opts = typeof options === 'string' ? {
            message: options
        } : options;

        return Observable.create((observer: Observer<boolean>) => {
            const ref = this.dialogService.open(DialogComponent, {
                context: Object.assign(
                    {
                        title: 'Info',
                        buttons: [{
                            label: 'Ok',
                            clazz: 'btn-primary',
                            callback: () => {
                                observer.next(true);
                                observer.complete();
                            }
                        }]
                    },
                    opts
                )
            });

            ref.onClose.pipe(take(1)).subscribe(() => {
                observer.next(false);
                observer.complete();
            });
        });
    }
}
