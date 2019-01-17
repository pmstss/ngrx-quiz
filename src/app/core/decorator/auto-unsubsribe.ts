import { OnDestroy } from '@angular/core';

// tslint:disable-next-line function-name
export function AutoUnsubscribe(target: any, key: string) {
    const cmp = target as OnDestroy;
    const ngOnDestroyOrig = cmp.ngOnDestroy;

    cmp.ngOnDestroy = function () {
        const subscription = this[key];
        if (subscription && (typeof subscription.unsubscribe === 'function')) {
            subscription.unsubscribe();
        }
        if (ngOnDestroyOrig && typeof ngOnDestroyOrig === 'function') {
            ngOnDestroyOrig.apply(this, arguments);
        }
    };
}
