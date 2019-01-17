import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BASE_URL_TOKEN } from '../tokens';
import { ResponseWrapper } from './api.types';

@Injectable()
export class ApiService {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject(BASE_URL_TOKEN) baseUrl) {
        this.apiUrl = `${baseUrl}/api`;
    }

    handleError(error: HttpErrorResponse) {
        console.error(error);
        if (error.error instanceof ErrorEvent) {
            return throwError({
                title: 'Client side network error',
                message: error.error.message
            });
        }

        return typeof error === 'string' ? throwError({
            message: error,
            title: 'Network error'
        }) : throwError({
            ...error,
            title: error.hasOwnProperty('tokenError') ? 'Token Error' : 'Network error'
        });
    }

    throwIfNotSuccess<T>(res: ResponseWrapper<T>): Observable<ResponseWrapper<T>> {
        return !res.success ? throwError(res) : of(res);
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<ResponseWrapper<T>>(`${this.apiUrl}${url}`).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data),
            catchError(this.handleError)
        );
    }

    post<T>(url: string, data: any): Observable<T> {
        return this.http.post<ResponseWrapper<T>>(`${this.apiUrl}${url}`, data).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data),
            catchError(this.handleError)
        );
    }

    put<T>(url: string, data: any): Observable<T> {
        return this.http.put<ResponseWrapper<T>>(`${this.apiUrl}${url}`, data).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data),
            catchError(this.handleError)
        );
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<ResponseWrapper<T>>(`${this.apiUrl}${url}`).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data),
            catchError(this.handleError)
        );
    }
}
