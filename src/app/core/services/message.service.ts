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

    get messages$(): Observable<Message> {
        return this.subject;
    }
}
