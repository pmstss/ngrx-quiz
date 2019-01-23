import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopScoresComponent } from './components/top-scores/top-scores.component';
import { SharedModule } from '../shared';

@NgModule({
    declarations: [TopScoresComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([{
            path: '',
            children: [
                {
                    path: '',
                    component: TopScoresComponent
                },
                {
                    path: ':quizId',
                    component: TopScoresComponent
                }
            ]
        }])
    ]
})
export class RatingModule { }
