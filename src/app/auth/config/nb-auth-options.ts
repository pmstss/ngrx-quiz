import { NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthOptions } from '@nebular/auth';
import { BASE_URL } from '../../consts';

export const nbAuthOptions: NbAuthOptions = {
    strategies: [
        NbPasswordAuthStrategy.setup({
            name: 'email',
            token: {
                class: NbAuthJWTToken,
                key: 'data.token'
            },
            baseEndpoint: `${BASE_URL}/auth`,
            login: {
                alwaysFail: false,
                endpoint: '/login',
                method: 'post',
                requireValidToken: false,
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Login/Email combination is not correct, please try again.'],
                defaultMessages: ['You have been successfully logged in.']
            },
            logout: {
                alwaysFail: false,
                endpoint: '/logout',
                method: 'post',
                requireValidToken: false,
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try logout again.'],
                defaultMessages: ['You have been successfully logged out.']
            },
            register: {
                alwaysFail: false,
                endpoint: '/register',
                method: 'post',
                requireValidToken: false,
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try registration again.'],
                defaultMessages: ['You have been successfully registered.'],
            },
            requestPass: {
                endpoint: '/reset',
                method: 'post'
            },
            refreshToken: {
                endpoint: '/refresh-token',
                method: 'post',
                requireValidToken: false,
                redirect: {
                    success: null,
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['Your token has been successfully refreshed.']
            },
            resetPass: false
        })
    ],
    forms: {}
};
