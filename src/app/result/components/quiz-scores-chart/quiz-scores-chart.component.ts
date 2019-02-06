import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IChartistSettingsType } from 'ngx-chartist';
import { QuizService } from '../../../core';
import { selectQuizState, QuizState, AppState } from '../../../store';

@Component({
    selector: 'app-quiz-scores-chart',
    templateUrl: './quiz-scores-chart.component.html',
    styleUrls: ['./quiz-scores-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizScoresChartComponent implements OnInit {
    // @ViewChild('chart') chartRef: NgxChartistComponent;
    chartOpts$: Observable<IChartistSettingsType>;

    private chartOpts: IChartistSettingsType = {
        data: {
            labels: null,
            series: null
        },
        options: {
            fullWidth: true,
            axisX: {
                onlyInteger: true
            },
            axisY: {
                scaleMinSpace: 10,
                onlyInteger: true
            }
        }
    };

    constructor(private appStore: Store<AppState>, private quizService: QuizService) {
    }

    ngOnInit() {
        this.chartOpts$ = this.appStore.select(selectQuizState).pipe(
            switchMap((quizState: QuizState) => this.quizService.getQuizScoreDistribution(quizState.id)),
            map((counters: number[]): IChartistSettingsType => {
                this.chartOpts.data.series = [counters];
                this.chartOpts.data.labels = counters.map((c, i) => i);
                // if (this.chartRef) {
                //     this.chartRef.chart.eventEmitter.emit('optionsChanged');
                // }
                return this.chartOpts;
            })
        );
    }
}
