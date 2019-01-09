import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { QuizService, ChoiceId } from '../../core';
import {
    QuizActionTypes, ActionLoadQuiz, ActionLoadQuizError, ActionLoadQuizSuccess,
    ActionLoadItem,
    ActionLoadItemSuccess,
    ActionLoadItemError,
    ActionSubmitAnswerSuccess,
    ActionSubmitAnswerError
} from './quiz.actions';
import { AppState } from '../app.state';
import { selectActiveItemId, selectActiveItemChoices } from './quiz.selectors';

@Injectable()
export class AppEffects {
    constructor(private appStore: Store<AppState>, private actions$: Actions, private quizService: QuizService) { }

    @Effect()
    loadQuizMeta$ = this.actions$.pipe(
        ofType(QuizActionTypes.LOAD_QUIZ),
        switchMap((action: Action) => {
            return this.quizService.loadQuizMeta((<ActionLoadQuiz>action).payload.quizName).pipe(
                map(res => new ActionLoadQuizSuccess(res)),
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
                selectActiveItemId(appState),
                new Set<ChoiceId>([...selectActiveItemChoices(appState).values()].filter(c => c.checked).map(c => c.id))
            ).pipe(
                map(answer => new ActionSubmitAnswerSuccess({ answer })),
                catchError(error => of(new ActionSubmitAnswerError(error)))
            );
        })
    );

}
