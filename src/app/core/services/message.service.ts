import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { NbToastrService } from '@nebular/theme';

export type Message = Partial<NbToastrConfig> & {
    message: string,
    title: string;
};

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private static MAX_MESSAGE_LENGTH = 200;
    private static MAX_TITLE_LENGTH = 50;

    private subject = new Subject<Message>();

    constructor(private toastrService: NbToastrService) {
        this.subject.subscribe((msg) => {
            this.toastrService.show(msg.message, msg.title, {
                status: msg.status,
                duration: msg.duration,
                preventDuplicates: true
            });
        });

    }

    private static truncate(str: string, maxLength: number) {
        // tslint:disable-next-line prefer-template
        return str && str.length > maxLength ? str.substr(0, maxLength) + '...' : str;
    }

    publish(msg: Message) {
        this.subject.next({
            ...msg,
            title: MessageService.truncate(msg.title, MessageService.MAX_TITLE_LENGTH),
            message: MessageService.truncate(msg.message, MessageService.MAX_MESSAGE_LENGTH)
        });
    }

    error(msg: Message) {
        console.error(msg.message);
        this.publish({
            ...msg,
            status: NbToastStatus.DANGER,
            duration: 0
        });
    }

    warn(message: string, title: string = 'Warning') {
        console.warn(message);
        this.publish({
            title,
            message,
            status: NbToastStatus.WARNING,
            duration: 0
        });
    }

    get messages$(): Observable<Message> {
        return this.subject.asObservable();
    }
}
