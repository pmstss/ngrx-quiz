import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { QuizMeta, AutoUnsubscribe } from '../../../core';
import { AppState, selectQuizMeta, ActionLoadQuiz } from '../../../store';

@Component({
    selector: 'app-quiz-intro',
    templateUrl: './quiz-intro.component.html',
    styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent implements OnInit {
    quizMeta$: Observable<QuizMeta>;
    @AutoUnsubscribe routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.quizMeta$ = this.appStore.select(selectQuizMeta);

        this.routeSubscription = this.route.params.pipe(
            map(params => params.name),
            distinctUntilChanged()
        ).subscribe(
            (quizName: string) => this.appStore.dispatch(new ActionLoadQuiz({ quizName }))
        );
    }
}
