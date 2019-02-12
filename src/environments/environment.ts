// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3333',
    captchaKey: '6LefD5AUAAAAAEYVU1mon3rx015k0tb_WI-yo7Ou',
    oauthGoogleUrl: '/assets/oauth-google-local.html',
    oauthGithubUrl: '/assets/oauth-github-local.html'
};

// TODO ### temp workaround for @ngrx/store-devtools
(Map.prototype as any).toJSON = function () {
    return [...this.entries()].reduce(
        (res, [key, value]) => {
            if (typeof key === 'string' || typeof key === 'number') {
                res[key] = value;
            } else {
                res['SERIALIZE_ERROR'] = 'Not all keys are string or numbers!';
            }
            return res;
        },
        {}
    );
};
(Set.prototype as any).toJSON = function () {
    return [...this];
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
