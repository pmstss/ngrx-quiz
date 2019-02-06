import { Component, ChangeDetectionStrategy } from '@angular/core';
// dirty import of not exported component
import { NbSearchFieldComponent } from '../../../../../node_modules/@nebular/theme/components/search/search.component';

// dirty inheritance with DRY violation till https://github.com/angular/angular/issues/13764 resolution
@Component({
    selector: 'custom-nb-search-field',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [
        '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.modal-zoomin.scss',
        '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.layout-rotate.scss',
        './custom-nb-search-field.component.scss'
        // other appearing types are not used and thus not imported
        // '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.modal-move.scss',
        // '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.curtain.scss',
        // '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.column-curtain.scss',
        // '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.modal-drop.scss',
        // '../../../../../node_modules/@nebular/theme/components/search/styles/search.component.modal-half.scss',
    ],
    templateUrl: './custom-nb-search-field.component.html'
})
export class CustomNbSearchFieldComponent extends NbSearchFieldComponent {

}
