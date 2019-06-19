import { hasIn } from 'ramda';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SearchModel } from '../../models/SarchModel';

@Component({
    selector: 'xdam-facets',
    templateUrl: './facets.component.html',
    styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit, OnChanges {
    @Input() data;

    @Output() onChange = new EventEmitter<SearchModel>();

    @HostBinding('class.open_facets') isOpen = false;

    protected facets = {};
    protected openFacets = [];
    protected first = true;

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (hasIn('data', changes)) {
            let start = changes.data.isFirstChange();
            if (!start) {
                start = (changes.data.previousValue as any[]).length === 0;
            }
            this.first = start;
        }
    }

    get openIcon() {
        return this.isOpen ? faChevronLeft : faChevronRight;
    }

    isOpenFacet(key: string): boolean {
        const result = this.openFacets.indexOf(key) !== -1;
        return result;
    }

    public setFacets(facet: any) {
        const key = Object.keys(facet.data)[0];
        const value = facet.data[key] as [];
        const emit = facet.emit;
        if (value.length > 0) {
            this.facets = { ...this.facets, ...facet.data };
        } else {
            delete this.facets[key];
        }

        const i = this.openFacets.indexOf(key);
        if (facet.isOpen && i === -1) {
            this.openFacets.push(key);
        } else if (!facet.isOpen && i !== -1) {
            this.openFacets.splice(i, 1);
        }

        const params = new SearchModel();
        params.facets = this.facets;

        if (emit) {
            this.onChange.emit(params.only('facets', 'page'));
        }
    }
}
