import { ActionModel } from './../../models/ActionModel';
import { faSearch, faEraser, faSync, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { hasIn, isNil, isEmpty } from 'ramda';
import { SearchOptions } from '../../models/interfaces/SearchModel.interface';
/**@ignore */
import { SearchModel } from '../../models/SarchModel';
@Component({
    selector: 'xdam-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Input() settings: SearchOptions = null;

    @Output() search = new EventEmitter<SearchModel>();
    @Output() action = new EventEmitter<ActionModel>();

    /**@ignore */
    faSearch = faSearch;

    /**@ignore */
    faEraser = faEraser;

    /**@ignore */
    faSync = faSync;

    /**@ignore */
    faTrash = faTrashAlt;

    content: string;
    lastContent: string;

    constructor() {}

    ngOnInit() {}

    get input() {
        let result = null;
        if (!isNil(this.settings) && hasIn('input', this.settings)) {
            result = this.settings.input;
        }
        return result;
    }

    get actions() {
        let result = null;
        if (!isNil(this.settings) && hasIn('actions', this.settings)) {
            result = this.settings.actions;
        }
        return result;
    }

    updateSearch() {
        if (this.lastContent !== this.content && !isNil(this.content)) {
            const params = new SearchModel();
            params.content = this.content;
            params.reload = true;
            this.search.emit(params.only('content', 'page', 'reload'));
            this.lastContent = this.content;
        }
    }

    resetSearch() {
        if (!isEmpty(this.lastContent) && !isNil(this.lastContent)) {
            const params = new SearchModel();
            params.reload = true;
            this.search.emit(params.only('content', 'page', 'reload'));
            this.lastContent = this.content = '';
        } else {
            this.content = '';
        }
    }

    sendAction() {
        const action = new ActionModel();
        action.method = 'new';
        return this.action.emit(action);
    }
}
