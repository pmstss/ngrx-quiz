/*
 * Project: ngrx-quiz (https://github.com/pmstss/ngrx-quiz)
 * Copyright 2019 Viachaslau Tyshkavets
 * Licensed under the GPLv3 License. See LICENSE.txt in the project root for license information.
 */
export interface TokenState {
    token: string;
    payload: any;
}

export const initialTokenState: TokenState = {
    token: null,
    payload: null
};
