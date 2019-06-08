import { Component, OnInit, Output, EventEmitter, Input, DoCheck, IterableDiffers } from '@angular/core';
import { isNil, hasIn, is } from 'ramda';
import { Item } from '../models/Item';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { XDamData, ItemModel } from '../models/interfaces/ItemModel.interface';
import { Pager } from '../models/Pager';
import { SearchModel } from '../models/SarchModel';
import { SearchOptions } from '../models/interfaces/SearchModel.interface';
import { XDamSettings } from '../models/XdamSettings';

/**
 * Entry point component for the application, is the component in charge of the
 * observation of parameters changes and requests.
 */
@Component({
    selector: 'xdam-main',
    templateUrl: './dam.component.html',
    styleUrls: ['./dam.component.scss']
})
export class DamComponent implements OnInit, DoCheck {
    @Input() items: XDamData;
    @Input() settings: XDamSettings;

    @Output() onSearch = new EventEmitter<any>();

    /**
     * The active item currently selected
     */
    activeItem = null;
    elements: Item[] = [];
    search: SearchModel;
    pager: Pager;
    elementDiffers;
    searchOptions: SearchOptions;
    loading: boolean;

    /**@ignore */
    constructor(private ngxSmartModalService: NgxSmartModalService, private _iterableDiff: IterableDiffers) {
        this.elementDiffers = this._iterableDiff.find(this.elements).create(null);
    }

    /**@ignore */
    ngOnInit() {
        this.loading = true;
        this.search = new SearchModel();

        if (!isNil(this.items) && hasIn('data', this.items) && this.items.data.length > 0) {
            this.perpareData();
        }

        if (!isNil(this.items) && hasIn('pager', this.items) && !isNil(this.items.pager)) {
            this.perpareData();
        }
    }

    ngDoCheck() {
        if (!isNil(this.items)) {
            const data: any[] = (this.items.data as []) || [];
            this.preparePager();
            if (this.elementDiffers.diff(data)) {
                this.perpareData();
            }
        }
    }

    /**
     * Map every raw row of data as a typed model class Item
     * @param data The model instance
     */
    perpareData() {
        let result = [];

        result = (this.items.data as [ItemModel?]).map(item => new Item(item));
        this.elements = result;
        this.loading = false;
    }

    preparePager() {
        this.pager = this.items.pager as Pager;
    }

    prepareSearch(parameters: any) {
        if (is(Object, parameters)) {
            this.search.update(parameters);
        }
        this.loading = true;
        this.onSearch.emit(this.search);
    }
}
