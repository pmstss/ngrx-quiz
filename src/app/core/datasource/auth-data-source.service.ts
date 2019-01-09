import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../tokens';
import { Observable, throwError, of } from 'rxjs';
import { User } from '../types/user';
import { map, concatMap, catchError, tap } from 'rxjs/operators';
import { UserCredentials } from '../types/user-credentials';

function generateId() {
    let s;
    for (s = ''; s.length < 32;) {
        s += Math.round((Math.random() * 1024)).toString(16);
    }
    return s.substr(0, 32);
}

@Injectable()
export class AuthDataSource {
    constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl) {
    }

    getUser(login: string): Observable<User> {
        return this.http.get<User[]>(`${this.baseUrl}/users?login=${login}`).pipe(
            concatMap(res => res.length ? of(res[0]) : throwError('No such user'))
        );
    }

    doesExist(login: string): Observable<boolean> {
        return this.getUser(login).pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    login(credentials: UserCredentials): Observable<User> {
        return this.http.get<User[]>(`${this.baseUrl}/users?username=${credentials.login}
&password=${credentials.password}`).pipe(
            map(users => users[0]),
            concatMap((user: User) => {
                if (!user) {
                    return throwError('Invalid credentials');
                }
                return of(user);
            })
        );
    }

    register(user: User & UserCredentials): Observable<User> {
        return this.http.post(`${this.baseUrl}/users`, {
            id: generateId(),
            ...user
        }).pipe(
            tap(res => console.log('### post result: %o', res)),
            map(() => ({
                login: user.login,
                firstName: user.firstName,
                lastName: user.lastName
            }))
        );
    }

}
