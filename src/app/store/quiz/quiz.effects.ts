import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { QuizService, ChoiceId } from '../../core';
import { DialogService } from '../../dialog';
import {
    QuizActionTypes, ActionLoadQuiz, ActionLoadQuizError, ActionLoadQuizSuccess,
    ActionLoadItem, ActionLoadItemSuccess, ActionLoadItemError,
    ActionSubmitAnswerSuccess, ActionSubmitAnswerError,
    ActionResetQuizSuccess, ActionResetQuizError
} from './quiz.actions';
import { AppState } from '../app.state';
import { selectActiveItem, selectActiveItemChoices, selectQuizState } from './quiz.selectors';
import { QuizState } from './quiz.state';

@Injectable()
export class QuizEffects {
    constructor(private appStore: Store<AppState>, private actions$: Actions,
                private router: Router, private quizService: QuizService,
                private location: Location, private dialogService: DialogService) { }

    @Effect()
    loadQuizMeta$ = this.actions$.pipe(
        ofType(QuizActionTypes.LOAD_QUIZ),
        switchMap((action: Action) => {
            return this.quizService.loadQuizMeta((<ActionLoadQuiz>action).payload.quizName).pipe(
                map(res => new ActionLoadQuizSuccess({ quizMeta: res.quizMeta, serverQuizState: res.quizState })),
                catchError(error => of(new ActionLoadQuizError(error)))
            );
        })
    );

    @Effect()
    loadItem$ = this.actions$.pipe(
        ofType(QuizActionTypes.LOAD_ITEM),
        withLatestFrom(this.appStore),
        switchMap(([action, appState]: [Action, AppState]) => {
            const payload = (<ActionLoadItem>action).payload;
            const id = appState.quiz.itemIds[payload.step - 1];
            const item = appState.quiz.items.get(id);
            return item ? of(new ActionLoadItemSuccess({
                item,
                choices: appState.quiz.choices.get(id)
            })) : this.quizService.loadItem(id).pipe(
                map(res => new ActionLoadItemSuccess(res)),
                catchError(error => of(new ActionLoadItemError(error)))
            );
        })
    );

    @Effect()
    submitAnswer$ = this.actions$.pipe(
        ofType(QuizActionTypes.SUBMIT_ANSWER),
        withLatestFrom(this.appStore),
        switchMap(([action, appState]: [Action, AppState]) => {
            return this.quizService.submitAnswer(
                selectQuizState(appState).id,
                selectActiveItem(appState).id,
                new Set<ChoiceId>([...selectActiveItemChoices(appState).values()].filter(c => c.checked).map(c => c.id))
            ).pipe(
                map(answer => new ActionSubmitAnswerSuccess({ answer })),
                catchError(error => of(new ActionSubmitAnswerError(error)))
            );
        })
    );

    @Effect()
    resetQuiz$ = this.actions$.pipe(
        ofType(QuizActionTypes.RESET_QUIZ),
        withLatestFrom(this.appStore),
        switchMap(([action, appState]: [Action, AppState]) => {
            const quizState = selectQuizState(appState);
            return (!quizState.finished ?
                    this.dialogService.confirm('Are you sure want to reset unfinished quiz?') : of(true))
                .pipe(
                    map(confirmed => [quizState, confirmed])
                );
        }),
        switchMap(([quizState, confirmed]: [QuizState, boolean]) => {
            if (confirmed) {
                return this.quizService.resetQuiz(quizState.id).pipe(
                    map(() => {
                        return new ActionResetQuizSuccess({ quizName: quizState.shortName });
                    }),
                    catchError(error => of(new ActionResetQuizError(error)))
                );
            }

            this.location.back();
            return of(new ActionResetQuizError({ canceled: true }));
        })
    );

    @Effect({ dispatch: false })
    resetQuizSuccess$ = this.actions$.pipe(
        ofType(QuizActionTypes.RESET_QUIZ_SUCCESS),
        tap((action: Action) => {
            const quizName = (action as ActionResetQuizSuccess).payload.quizName;
            this.router.navigateByUrl(`/quiz/${quizName}/1`);
        })
    );
}
