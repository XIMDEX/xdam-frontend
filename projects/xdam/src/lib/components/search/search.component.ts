import { faSearch, faEraser, faSync, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';
import { hasIn, isNil } from 'ramda';
import { SearchOptions } from '../../models/interfaces/SearchModel.interface';
/**@ignore */
@Component({
    selector: 'xdam-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Input() searchOptions: SearchOptions = null;

    /**@ignore */
    faSearch = faSearch;

    /**@ignore */
    faEraser = faEraser;

    /**@ignore */
    faSync = faSync;

    /**@ignore */
    faTrash = faTrashAlt;

    constructor() {}

    ngOnInit() {}

    get input() {
        let result = null;
        if (!isNil(this.searchOptions) && hasIn('input', this.searchOptions)) {
            result = this.searchOptions.input;
        }
        return result;
    }
}
