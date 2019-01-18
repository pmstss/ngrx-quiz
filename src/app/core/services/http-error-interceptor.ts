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
import { Router } from '@angular/router';
import { NbTokenService } from '@nebular/auth';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService, private router: Router,
                private tokenService: NbTokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                // retry(1), // TODO ### retryWhen
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

                    // TODO ### better indicator of token error?
                    if (error.status === 401) {
                        this.tokenService.clear();
                        this.router.navigateByUrl('/auth/login');
                    }

                    return throwError({
                        ...error,
                        processed: true
                    });
                })
            );
    }
}
