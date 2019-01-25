import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { QuizService, TopScore, QuizMetaListItem, QuizId } from '../../../core';
import { switchMap, map, filter, tap, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-top-scores',
    templateUrl: './top-scores.component.html',
    styleUrls: ['./top-scores.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopScoresComponent implements OnInit {
    topScores$: Observable<TopScore[]>;
    quizList$: Observable<QuizMetaListItem[]>;

    quiz$: Observable<QuizMetaListItem>;
    quizId$: Observable<QuizId>;

    constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    }

    selectQuiz(quizId) {
        return this.router.navigateByUrl(`/top/${quizId}`);
    }

    ngOnInit() {
        this.quizList$ = this.quizService.loadQuizList().pipe(shareReplay(1));

        this.quizId$ = this.route.params.pipe(
            switchMap(params => params.quizId ? of(params.quizId) : this.quizList$.pipe(
                map(res => res && res[0] && res[0].id)
            )),
            filter(x => !!x),
            distinctUntilChanged()
        );

        this.quiz$ = combineLatest(this.quizList$, this.quizId$).pipe(
            map(([quizList, quizId]) => quizList.find(q => q.id === quizId))
        );

        this.topScores$ = this.quizId$.pipe(
            switchMap(quizId => this.quizService.loadTopScores(quizId))
        );
    }
}