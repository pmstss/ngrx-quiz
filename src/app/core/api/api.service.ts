import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BASE_URL_TOKEN } from '../../consts';
import { ResponseWrapper } from './api.types';
import { CustomError } from '../types/custom-error';

@Injectable()
export class ApiService {
    private apiUrl: string;

    constructor(private http: HttpClient, @Inject(BASE_URL_TOKEN) baseUrl) {
        this.apiUrl = `${baseUrl}/api`;
    }

    throwIfNotSuccess<T>(res: ResponseWrapper<T>): Observable<ResponseWrapper<T>> {
        if (!res.success) {
            throw new CustomError(res.message, 'API Error');
        }
        return of(res);
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<ResponseWrapper<T>>(`${this.apiUrl}${url}`).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data)
        );
    }

    post<T>(url: string, data: any): Observable<T> {
        return this.http.post<ResponseWrapper<T>>(`${this.apiUrl}${url}`, data).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data)
        );
    }

    put<T>(url: string, data: any): Observable<T> {
        return this.http.put<ResponseWrapper<T>>(`${this.apiUrl}${url}`, data).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data)
        );
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<ResponseWrapper<T>>(`${this.apiUrl}${url}`).pipe(
            switchMap(this.throwIfNotSuccess),
            map(res => res.data)
        );
    }
}
