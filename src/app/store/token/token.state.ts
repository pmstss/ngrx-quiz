export interface TokenState {
    token: string;
    payload: any;
}

export const initialTokenState: TokenState = {
    token: null,
    payload: null
};
