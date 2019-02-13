/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const BASE_URL_TOKEN = new InjectionToken('BASE_URL');
export const BASE_URL = environment.apiUrl;
export const CAPTCHA_KEY = environment.captchaKey;
