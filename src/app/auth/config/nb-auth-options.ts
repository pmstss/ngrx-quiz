import { NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthOptions } from '@nebular/auth';
import { BASE_URL } from '../../consts';

export const nbAuthOptions: NbAuthOptions = {
    strategies: [
        NbPasswordAuthStrategy.setup({
            name: 'email',
            token: {
                class: NbAuthJWTToken,
                key: 'token'
            },
            baseEndpoint: `${BASE_URL}/auth`,
            login: {
                endpoint: '/login',
                method: 'post'
            },
            logout: {
                endpoint: '/logout',
                method: 'post'
            },
            register: {
                endpoint: '/register',
                method: 'post'
            },
            requestPass: {
                endpoint: '/reset',
                method: 'post'
            },
            resetPass: false
        })
    ],
    forms: {}
};
