import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
// dirty import of not exported component
import { NbSearchComponent } from '../../../../../node_modules/@nebular/theme/components/search/search.component';

// dirty inheritance with DRY violation till https://github.com/angular/angular/issues/13764 resolution
@Component({
    selector: 'custom-nb-search',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.scss',
        './custom-nb-search.component.scss'
    ],
    templateUrl: './custom-nb-search.component.html'
})
export class CustomNbSearchComponent extends NbSearchComponent {
    @Input() value: string;

    search(term: string) {
        // private member access hack
        this['searchService'].submitSearch(term.trim(), this.tag);
        if (term.endsWith('\n')) {
            this.hideSearch();
        }
    }
}
