import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxChartistModule } from 'ngx-chartist';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { SharedModule } from '../shared';
import { QuizModule, QuizGuard, QuizFinishedGuard } from '../quiz';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizScoresChartComponent } from './components/quiz-scores-chart/quiz-scores-chart.component';

@NgModule({
    declarations: [QuizResultComponent, QuizScoresChartComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '',
            children: [{
                path: ':name',
                component: QuizResultComponent,
                canActivate: [QuizGuard, QuizFinishedGuard]
            }]
        }]),
        QuizModule,
        NgxChartistModule,
        ShareButtonsModule
    ],
    exports: []
})
export class QuizResultModule { }
