import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, concatMap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { QuizMeta, MessageService } from '../../core';
import { AppState, ActionLoadQuiz, QuizActionTypes, selectQuizState, QuizState } from '../../store';

@Injectable()
export class QuizGuard implements CanActivate {
    constructor(private router: Router, private appStore: Store<AppState>,
                private actions$: Actions, private messageService: MessageService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        return this.appStore.select(selectQuizState).pipe(
            take(1),
            concatMap((quizState: QuizState): Observable<boolean>  => {
                if (!quizState.shortName && next.params.name) {
                    this.appStore.dispatch(new ActionLoadQuiz({ quizName: next.params.name }));
                    return this.actions$.pipe(
                        filter(action => action.type === QuizActionTypes.LOAD_QUIZ_SUCCESS ||
                            action.type === QuizActionTypes.LOAD_QUIZ_SUCCESS),
                        take(1),
                        map((action) => {
                            if (action.type !== QuizActionTypes.LOAD_QUIZ_SUCCESS) {
                                this.messageService.warn(
                                    'Quiz was not loaded successfully, will redirect to quiz list');
                                return false;
                            }
                            return true;
                        })
                    );
                }
                return of(true);
            }),
            concatMap((loaded: boolean): Observable<boolean> => {
                if (loaded && typeof next.params.step !== 'undefined') {
                    return this.appStore.select(selectQuizState).pipe(
                        take(1),
                        map((quizState: QuizState) => {
                            const step = parseInt(next.params.step, 10);
                            if (isNaN(step)) {
                                this.messageService.warn(`Invalid step value: ${next.params.step}`);
                            } else if (step < 1 || step > quizState.totalQuestions) {
                                this.messageService.warn(`Step is out of bound: ${step}`);
                            } else {
                                return true;
                            }
                            return false;
                        })
                    );
                }
                return of(loaded);
            }),
            map((success: boolean): boolean | UrlTree => {
                return success || this.router.parseUrl('/quizes');
            })
        );
    }
}
