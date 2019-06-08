import { faStepBackward, faCaretLeft, faCaretRight, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { PerPageModel, PagerModel } from '../../models/interfaces/PagerModel.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchModel } from '../../models/SarchModel';
import { PagerOptionsItems } from '../../models/interfaces/PagerOptions.interface';
import { isNil, hasIn } from 'ramda';

@Component({
    selector: 'xdam-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
    @Input() total: number | null = null;
    @Input() perPage: PerPageModel | null = null;
    @Input() pager: PagerModel | null = null;
    @Input() settings: PagerOptionsItems;

    @Output() change = new EventEmitter<SearchModel>();

    constructor() {}

    /**
     * Creates the paginator data based on info about current and total pages
     */
    get paginator() {
        const paginator = [];
        let pagShorted = false;

        if (this.pager.lastPage >= 3) {
            pagShorted = true;
        }

        if (this.pager.currentPage > 2 && pagShorted) {
            paginator.push({ value: 1, active: false, icon: faStepBackward });
            paginator.push({ value: this.pager.currentPage - 1, active: false, icon: faCaretLeft });
        }
        for (let i = 1; i <= this.pager.lastPage; i++) {
            if (pagShorted) {
                if (i < this.pager.currentPage + 3 && i > this.pager.currentPage - 3) {
                    paginator.push({ value: i, active: i === this.pager.currentPage, icon: null });
                }
            } else {
                paginator.push({ value: i, active: i === this.pager.currentPage, icon: null });
            }
        }
        if (this.pager.currentPage < this.pager.lastPage - 2 && pagShorted) {
            paginator.push({ value: this.pager.currentPage + 1, active: false, icon: faCaretRight });
            paginator.push({ value: this.pager.lastPage, active: false, icon: faStepForward });
        }
        return paginator;
    }

    get hasTotal() {
        return !isNil(this.settings) && hasIn('total', this.settings) ? this.settings.total : false;
    }

    get hasPager() {
        return !isNil(this.settings) && hasIn('pager', this.settings) ? this.settings.pager : false;
    }

    get hasLimit() {
        return !isNil(this.settings) && hasIn('limit', this.settings) ? this.settings.limit : false;
    }

    updateLimit(value: number) {
        const params = new SearchModel();
        params.limit = value;
        this.change.emit(params);
    }

    updatePage(value: number) {
        const params = new SearchModel();
        params.limit = this.perPage.value;
        params.page = value;
        this.change.emit(params);
    }
}
