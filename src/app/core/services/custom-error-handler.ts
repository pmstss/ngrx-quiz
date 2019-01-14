import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from './message.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
    constructor(private messageService: MessageService, private ngZone: NgZone) {
        super();
    }

    handleError(error) {
        super.handleError(error);
        // trigger change detection
        this.ngZone.run(
            () => this.messageService.publish({
                message: error.message ? error.message.split('\n')[0] : error,
                title: error.title || 'Error',
                status: NbToastStatus.DANGER,
                duration: 0
            }),
            0
        );
    }
}
