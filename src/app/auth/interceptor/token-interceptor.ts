import { Injectable, Inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { BASE_URL_TOKEN } from '../../consts';
import { AppState, selectToken } from '../../store';

/*** Not used now - existing NbAuthJWTInterceptor is utilized; exists for possible future needs */

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private appStore: Store<AppState>, @Inject(BASE_URL_TOKEN) private baseUrl) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.appStore.select(selectToken).pipe(
            take(1),
            switchMap((token) => {
                if (!token || !request.url.startsWith(this.baseUrl)) {
                    return next.handle(request);
                }

                return next.handle(request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                }));
            })
        );
    }
}
