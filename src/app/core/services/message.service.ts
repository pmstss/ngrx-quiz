import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';

export type Message = Partial<NbToastrConfig> & {
    message: string,
    title: string;
};

@Injectable()
export class MessageService {
    private subject = new Subject<Message>();

    publish(msg: Message) {
        this.subject.next(msg);
    }

    publishError(msg: Message) {
        this.subject.next({
            ...msg,
            status: NbToastStatus.DANGER,
            duration: 0
        });
    }

    publishWarning(message: string, title: string = 'Warning') {
        console.warn(message);
        this.subject.next({
            title,
            message,
            status: NbToastStatus.WARNING,
            duration: 0
        });
    }

    get messages$(): Observable<Message> {
        return this.subject;
    }
}
