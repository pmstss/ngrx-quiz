import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectQuizState, QuizState, ActionResetQuiz } from '../../../store';
import { map, switchMap } from 'rxjs/operators';
import { QuizId, QuizScore } from 'ngrx-quiz-common';
import { QuizService } from '../../../core';

interface QuizScoreMeta {
    scoreAbsolute: number;
    scorePercent: number;
    betterAbsolute: number;
    betterPercent: number;
    worseAbsolute: number;
    worsePercent: number;
}

interface QuizStateScore extends QuizState {
    scoreMeta: QuizScoreMeta;
}

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html'
})
export class QuizResultComponent implements OnInit {
    quizStateScore$: Observable<QuizStateScore>;

    constructor(private appStore: Store<AppState>, private quizService: QuizService) {
    }

    ngOnInit() {
        this.quizStateScore$ = this.appStore.select(selectQuizState).pipe(
            switchMap((quizState: QuizState) => this.quizService.getQuizScore(quizState.id).pipe(
                map((quizScore: QuizScore) => ({
                    ...quizState,
                    scoreMeta: {
                        scoreAbsolute: quizState.score,
                        scorePercent: quizScore.score,
                        betterAbsolute: quizScore.better,
                        betterPercent: quizScore.better / (quizScore.better + quizScore.worse),
                        worseAbsolute: quizScore.worse,
                        worsePercent: quizScore.worse / (quizScore.better + quizScore.worse)
                    }
                }))
            ))
        );
    }

    reset() {
        this.appStore.dispatch(new ActionResetQuiz({}));
    }
}
