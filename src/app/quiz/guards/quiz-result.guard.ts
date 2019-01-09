import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectQuizState, QuizState, AppState } from '../../store';

@Injectable()
export class QuizResultGuard implements CanActivate {
    constructor(private router: Router, private appStore: Store<AppState>) {
        console.log('### QuizResultGuard');
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.appStore.select(selectQuizState).pipe(
            take(1),
            map((quizState: QuizState): boolean | UrlTree => {
                if (quizState.finished) {
                    return true;
                }

                return this.router.parseUrl(`/quiz/${route.params.name}/1`);
            })
        );
    }
}
