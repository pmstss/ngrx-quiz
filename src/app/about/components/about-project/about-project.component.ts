import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-about-project',
    templateUrl: './about-project.component.html',
    styleUrls: ['./about-project.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutProjectComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
