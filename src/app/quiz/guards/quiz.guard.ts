import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { QuizMeta } from '../../core';
import { AppState, ActionLoadQuiz, QuizActionTypes, selectQuizMeta, selectQuizState, QuizState } from '../../store';

@Injectable()
export class QuizGuard implements CanActivate {
    constructor(private router: Router, private appStore: Store<AppState>, private actions$: Actions) {
        console.log('### quizGuard constructor');
    }

    canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean | UrlTree> {
        console.log('### QuizGuard:canActivate() - state: %o, next: %o', routerState, next);

        return this.appStore.select(selectQuizState).pipe(
            take(1),
            concatMap((quizState: QuizState): Observable<boolean | UrlTree>  => {
                if (!quizState.quizName && next.params.name) {
                    this.appStore.dispatch(new ActionLoadQuiz({ quizName: next.params.name }));
                    return this.actions$.pipe(
                        take(1),
                        map(action => action.type === QuizActionTypes.LOAD_QUIZ_SUCCESS ||
                                this.router.parseUrl('/quizes'))
                    );
                }
                return of(true);
            }),
            concatMap((x: boolean | UrlTree): Observable<boolean | UrlTree> => {
                if (typeof x === 'boolean' && x) {
                    return this.appStore.select(selectQuizMeta).pipe(
                        take(1),
                        map((quizMeta: QuizMeta) => {
                            if (+next.params.step > quizMeta.totalQuestions) {
                                return this.router.parseUrl('/quizes');
                            }
                            return true;
                        })
                    );
                }
                return of(x);
            })
        );
    }
}
