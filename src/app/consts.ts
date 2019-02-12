import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const BASE_URL_TOKEN = new InjectionToken('BASE_URL');
export const BASE_URL = environment.apiUrl;
export const CAPTCHA_KEY = environment.captchaKey;
