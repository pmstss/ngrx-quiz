import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbSearchModule } from '@nebular/theme';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';

@NgModule({
    declarations: [QuizListComponent],
    imports: [
        CoreModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: QuizListComponent
            }
        ]),
        NbCardModule,
        NbSearchModule,
        QuillModule,
        SharedModule
    ],
    providers: []
})
export class QuizListModule { }
