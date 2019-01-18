import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1), // TODO ### retryWhen
                catchError((error: HttpErrorResponse) => {
                    if (error.error instanceof ErrorEvent) {
                        this.messageService.publishError({
                            title: 'Client side network error',
                            message: error.error.message
                        });
                    }

                    this.messageService.publishError({
                        title: 'Network Error',
                        message: error.status === 0 ? 'Server is unavailable' :
                            error.error && error.error.message || error.message
                    });

                    return throwError({
                        ...error,
                        processed: true
                    });
                })
            );
    }
}
