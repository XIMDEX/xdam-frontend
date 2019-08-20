import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ItemModel, XDamData } from './../../models/src/lib/interfaces/ItemModel.interface';
import { hasIn, is, isNil } from 'ramda';

import { ActionModel } from '../../models/src/lib/ActionModel';
import { FacetModel } from '../../models/src/lib/FacetModel';
import { Item } from '../../models/src/lib/Item';
import { Pager } from '../../models/src/lib/Pager';
import { SearchModel } from '../../models/src/lib/SearchModel';
import { SearchOptionsI } from './../../models/src/lib/interfaces/SearchModel.interface';
import { XDamSettings } from '../../models/src/lib/XDamSettings';

/**
 * Entry point component for the application, is the component in charge of the
 * observation of parameters changes and requests.
 */
@Component({
    selector: 'xdam-main',
    templateUrl: './dam.component.html',
    styleUrls: ['./dam.component.scss']
})
export class DamComponent implements OnInit, OnChanges {
    @Input() items: XDamData;
    @Input() settings: XDamSettings;
    @Input() action: ActionModel;

    @Output() onSearch = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<Item>();
    @Output() onDownload = new EventEmitter<Item>();
    @Output() onSave = new EventEmitter<any>();
    @Output() onAction = new EventEmitter<ActionModel>();

    @HostBinding('class.dam-main') readonly baseClass = true;

    /**
     * The active item currently selected
     */
    activeItem = null;
    elements: Item[] = [];
    search: SearchModel;
    facets: FacetModel[] = [];
    pager: Pager;
    searchOptions: SearchOptionsI;
    loading: boolean;
    actionModel: ActionModel | null;
    displayForm: boolean = false;

    /**@ignore */
    constructor() {}

    /**@ignore */
    ngOnInit() {
        this.loading = true;

        if (!isNil(this.items) && hasIn('data', this.items) && this.items.data.length > 0) {
            this.perpareData();
        }

        if (!isNil(this.items) && hasIn('pager', this.items) && !isNil(this.items.pager)) {
            this.preparePager();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (hasIn('items', changes) && !changes.items.isFirstChange()) {
            this.preparePager();
            this.perpareData();
        }

        if (hasIn('action', changes)) {
            this.setAction(this.action);
        }
    }

    /**
     * Map every raw row of data as a typed model class Item
     * @param data The model instance
     */
    perpareData() {
        let result = [];

        result = (this.items.data as [ItemModel?]).map(item => new Item(item, this.settings.list.model || null));

        this.facets = (this.items.facets as FacetModel[]).map(facet => new FacetModel(facet));
        this.initSearch(this.facets);
        this.elements = result;
        this.loading = false;
    }

    initSearch(facets: FacetModel[]) {
        if (isNil(this.search)) {
            const defFacet = {};
            facets.forEach(facet => {
                if (hasIn('default', facet) && !isNil(facet.default)) {
                    defFacet[facet.key] = [facet.default];
                }
            });
            this.search = new SearchModel();
            this.search.facets = defFacet;
        }
    }

    setAction(action: ActionModel) {
        if (isNil(this.actionModel) && !isNil(action)) {
            this.actionModel = new ActionModel(action);
            this.loading = false;
        } else if (!isNil(this.actionModel) && !isNil(action)) {
            this.actionModel = new ActionModel(action);
        }

        if (!isNil(action)) {
            this.displayForm = action.status !== 'success';
        }
    }

    closeAction() {
        this.actionModel = null;
        this.displayForm = false;
    }

    preparePager() {
        this.pager = this.items.pager as Pager;
    }

    prepareSearch(parameters: SearchModel) {
        if (is(Object, parameters)) {
            this.search.update(parameters);
        }

        if (parameters.reload) {
            this.sendSearch();
        }
    }

    sendSearch() {
        this.loading = true;
        this.onSearch.emit(this.search);
    }

    deleteItem(item: Item) {
        this.loading = true;
        this.onDelete.emit(item);
    }

    downloadItem(item: Item) {
        this.onDownload.emit(item);
    }

    sendAction(action: ActionModel) {
        this.loading = true;
        this.onAction.emit(action);
    }
}
