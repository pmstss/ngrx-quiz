import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbTabsetModule } from '@nebular/theme';
import { SharedModule } from '../shared';
import { AboutComponent } from './components/about/about.component';
import { AboutProjectComponent } from './components/about-project/about-project.component';
import { AboutAuthorComponent } from './components/about-author/about-author.component';
import { AboutVersionComponent } from './components/about-version/about-version.component';

@NgModule({
    declarations: [AboutComponent, AboutProjectComponent, AboutAuthorComponent, AboutVersionComponent],
    imports: [
        SharedModule,
        NbTabsetModule,
        RouterModule.forChild([{
            path: '',
            component: AboutComponent
        }])
    ]
})
export class AboutModule { }
