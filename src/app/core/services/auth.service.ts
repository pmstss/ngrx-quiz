import { Injectable, Inject } from '@angular/core';
import { concatMap, map, tap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { User } from '../types/user';
import { UserCredentials } from '../types/user-credentials';
import { AuthDataSource } from '../datasource/auth-data-source.service';

@Injectable()
export class AuthService {
    constructor(private authDataSource: AuthDataSource) {
    }

    login(credentials: UserCredentials): Observable<User> {
        return this.authDataSource.login(credentials);
    }

    register(user: User & UserCredentials) {
        return this.authDataSource.doesExist(user.login).pipe(
            concatMap((exist: boolean) => {
                if (exist) {
                    return throwError(`Login ${user.login} already exist`);
                }
                return this.authDataSource.register(user);
            })
        );
    }
}
