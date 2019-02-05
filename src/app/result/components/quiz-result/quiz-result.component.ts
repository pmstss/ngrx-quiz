import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { QuizScore } from 'ngrx-quiz-common';
import { AppState, selectQuizState, QuizState, ActionResetQuiz } from '../../../store';
import { QuizService } from '../../../core';
import './social-icons';

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
    styleUrls: ['./quiz-result.component.scss'],
    templateUrl: './quiz-result.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
