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
