import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { QuizComponent } from './components/quiz.component';
import { QuizGuard } from './guards/quiz.guard';
import { QuizNameGuard } from './guards/quiz-name.guard';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizResultGuard } from './guards/quiz-result.guard';

@NgModule({
    declarations: [QuizComponent, QuizIntroComponent, QuizResultComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: '',
            children: [{
                path: ':name',
                component: QuizIntroComponent,
                canActivate: [QuizNameGuard]
            }, {
                path: ':name/result',
                component: QuizResultComponent,
                canActivate: [QuizResultGuard, QuizGuard]
            }, {
                path: ':name/:step',
                component: QuizComponent,
                canActivate: [QuizGuard]
            }]
        }]),
        QuillModule
    ],
    providers: [QuizGuard, QuizNameGuard, QuizResultGuard]
})
export class QuizModule {
    constructor() {
        console.log('### QuizModule constructor');
    }
}
