import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ChoiceId } from 'ngrx-quiz-common';
import { QuizService } from '../../core';
import { DialogService } from '../../dialog';
import {
    QuizActionTypes, ActionLoadQuiz, ActionLoadQuizError, ActionLoadQuizSuccess,
    ActionLoadItem, ActionLoadItemSuccess, ActionLoadItemError,
    ActionSubmitAnswerSuccess, ActionSubmitAnswerError,
    ActionResetQuizSuccess, ActionResetQuizError,
    ActionPostItemComment, ActionPostItemCommentSuccess, ActionPostItemCommentError,
    ActionLoadItemCommentsSuccess, ActionLoadItemCommentsError
} from './quiz.actions';
import { AppState } from '../app.state';
import { selectQuizActiveItem, selectQuizState, selectActiveItemAnswer,
    selectQuizActiveItemId, selectItemComments} from './quiz.selectors';
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
            return this.quizService.loadQuiz((<ActionLoadQuiz>action).payload.quizName).pipe(
                map(quiz => new ActionLoadQuizSuccess({ quiz })),
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
                item
            })) : this.quizService.loadItem(id).pipe(
                map(item => new ActionLoadItemSuccess({ item })),
                catchError(error => of(new ActionLoadItemError(error)))
            );
        })
    );

    @Effect()
    loadItemComments$ = this.actions$.pipe(
        ofType(QuizActionTypes.LOAD_ITEM_COMMENTS),
        withLatestFrom(this.appStore),
        switchMap(([, appState]: [Action, AppState]) => {
            const item = selectQuizActiveItem(appState);
            const comments = selectItemComments(appState);
            const offset = comments && comments.length || 0;
            const loaded = typeof comments !== 'undefined' && (comments[offset] || offset >= item.numberOfComments);

            return loaded ? of(new ActionLoadItemCommentsSuccess({
                offset,
                itemId: item.id,
                alreadyLoaded: true
            })) : this.quizService.loadComments(item.id, offset).pipe(
                map(comments => new ActionLoadItemCommentsSuccess({
                    offset,
                    comments,
                    itemId: item.id
                })),
                catchError(error => of(new ActionLoadItemCommentsError(error)))
            );
        })
    );

    @Effect()
    submitAnswer$ = this.actions$.pipe(
        ofType(QuizActionTypes.SUBMIT_ANSWER),
        withLatestFrom(this.appStore),
        switchMap(([, appState]: [Action, AppState]) => {
            const choices = selectActiveItemAnswer(appState).choiceAnswers;
            return this.quizService.submitAnswer(
                selectQuizState(appState).id,
                selectQuizActiveItem(appState).id,
                new Set<ChoiceId>([...choices.keys()].filter(id => choices.get(id).checked))
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
        switchMap(([, appState]: [Action, AppState]) => {
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

    @Effect()
    commentItem$ = this.actions$.pipe(
        ofType(QuizActionTypes.POST_ITEM_COMMENT),
        withLatestFrom(this.appStore),
        switchMap(([action, appState]: [Action, AppState]) => {
            const text = (action as ActionPostItemComment).payload.text;
            const itemId = selectQuizActiveItemId(appState);
            return this.quizService.postComment(itemId, text).pipe(
                map(comment => new ActionPostItemCommentSuccess({ itemId, comment })),
                catchError(error => of(new ActionPostItemCommentError(error)))
            );
        })
    );
}
