import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartistModule } from 'ngx-chartist';
import { QuizScoresChartComponent } from './components/quiz-scores-chart/quiz-scores-chart.component';

@NgModule({
    declarations: [QuizScoresChartComponent],
    imports: [
        CommonModule,
        NgxChartistModule
    ],
    exports: [QuizScoresChartComponent]
})
export class ChartsModule { }
