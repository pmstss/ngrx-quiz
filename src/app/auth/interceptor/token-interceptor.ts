import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectToken } from '../../store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private appStore: Store<AppState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.appStore.select(selectToken).pipe(
            filter(token => !!token),
            switchMap(token => next.handle(request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })))
        );
    }
}
