/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';
import { ApiService } from '../../core';

interface LoginResponse {
    token: string;
}

@Injectable()
export class AnonymousAuthService {
    constructor (private apiService: ApiService, private tokenService: NbTokenService,
                 private authStrategy: NbPasswordAuthStrategy) {
    }

    anonymousLogin(captchaToken: string): Observable<boolean> {
        return this.apiService.postBase<LoginResponse>('/auth/anonymous', { captchaToken }).pipe(
            map((res: LoginResponse) => {
                this.tokenService.set(this.authStrategy.createToken(res.token));
                return true;
            })
        );
    }
}
