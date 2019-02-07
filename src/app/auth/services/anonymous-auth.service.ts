import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core';

interface LoginResponse {
    token: string;
}

@Injectable()
export class AnonymousAuthService {
    constructor (private apiService: ApiService) {
    }

    anonymousLogin(): Observable<LoginResponse> {
        return this.apiService.postBase<LoginResponse>('/auth/anonymous', null);
    }
}
