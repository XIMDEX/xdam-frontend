import { PerPageModel } from './../../models/PagerModel.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchModel } from '../../models/SarchModel';

@Component({
    selector: 'xdam-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
    @Input() total: number | null = null;

    @Input() perPage: PerPageModel | null = null;

    @Output() changeLimit = new EventEmitter<SearchModel>();

    constructor() {}

    updateLimit(value: number) {
        const params = new SearchModel();
        params.limit = value;
        this.changeLimit.emit(params);
    }
}
