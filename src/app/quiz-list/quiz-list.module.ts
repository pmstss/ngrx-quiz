import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CoreModule } from '../core';
import { NbCardModule } from '@nebular/theme';

@NgModule({
    declarations: [QuizListComponent],
    imports: [
        CoreModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: QuizListComponent
            }
        ]),
        NbCardModule
    ],
    providers: []
})
export class QuizListModule { }
