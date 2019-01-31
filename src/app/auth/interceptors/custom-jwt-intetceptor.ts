import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, catchError, tap, filter, first } from 'rxjs/operators';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthService, NbAuthToken } from '@nebular/auth';

/*
* The problem with original NbAuthJwtInterceptor that it doesn't do any handling of token refresh requests.
* Imagine ten simultaneus requests in case of already expired token, then 10 refresh token requests will be made.
* If server discards token just after renew (e.g. on first request) - which is most simple and secure strategy,
* than next 9 requests will fail because of "unknown" token.
* CustomJWTInterceptor "waits" for refresh token request to be finished before processing other requests
*/

@Injectable()
export class CustomJWTInterceptor implements HttpInterceptor {
    private refreshIsActive$ = new BehaviorSubject<boolean>(false);

    constructor(private injector: Injector, @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
    }

    private isAuthenticatedOrRefresh(): Observable<boolean> {
        return this.refreshIsActive$.pipe(
            filter((x: boolean) => !x),
            first(),
            switchMap(() => this.authService.getToken()),
            switchMap((token: NbAuthToken) => {
                if (token.getValue() && !token.isValid()) {
                    this.refreshIsActive$.next(true);
                    return this.authService.refreshToken(token.getOwnerStrategyName(), token).pipe(
                        switchMap(res =>
                            res.isSuccess() ? this.authService.isAuthenticated() : of(false)
                        ),
                        tap(() => this.refreshIsActive$.next(false)),
                        catchError((err) => {
                            this.refreshIsActive$.next(false);
                            return throwError(err);
                        })
                    );
                }
                return of(token.isValid());
            })
        );
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // do not intercept request whose urls are filtered by the injected filter
        if (!this.filter(req)) {
            return this.isAuthenticatedOrRefresh().pipe(
                switchMap((authenticated) => {
                    if (authenticated) {
                        return this.authService.getToken().pipe(
                            switchMap((token: NbAuthToken) => {
                                return next.handle(req.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${token.getValue()}`
                                    }
                                }));
                            })
                        );
                    }

                    // Request is sent to server without authentication so that the client code
                    // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
                    return next.handle(req);
                })
            );
        }

        return next.handle(req);
    }

    protected get authService(): NbAuthService {
        return this.injector.get(NbAuthService);
    }
}
