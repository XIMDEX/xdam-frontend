import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { MainService } from './services/main.service';
import { XDamData } from '../../projects/xdam/src/lib/models/ItemModel.interface';
import { HttpParams } from '@angular/common/http';
import { Pager } from 'projects/xdam/src/lib/models/Pager';
import { PagerModelSchema } from 'projects/xdam/src/lib/models/PagerModel.interface';
import { SearchModel } from 'projects/xdam/src/lib/models/SarchModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'poly-dam';

    /**
     * A dict containing the main configurations for the application
     */
    mainConfig = null;

    /**
     * An instance of the mapper for Item model
     */
    imap = null;

    /**@ignore */
    limit = null;

    /**@ignore */
    search = null;

    items: XDamData;

    /**
     * A dict with the current query
     */
    query: any = { page: 1, search: '', perPage: 20, lastPage: 1, total: 0 };

    /**@ignore */
    page: string;

    /**
     * The current selected page
     */
    currentPage = 1;

    /**
     * The current selected search string
     */
    searchTerm = '';

    /**
     * An array of all available facets
     */
    facets = {};

    /**
     * Property used to show loading component
     */
    isLoading = false;

    private pagerSchema: PagerModelSchema = {
        total: 'total',
        currentPage: 'page',
        lastPage: 'pages',
        nextPage: 'prev',
        prevPage: 'next',
        perPage: {
            value: 'per_page'
        }
    };

    constructor(private mainService: MainService, private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.mainConfig = this.mainService.getComponentConfigs('main');
        this.imap = this.mainService.itemModel;

        this.limit = this.mainConfig.query.limit;
        this.search = this.mainConfig.query.search;
        this.page = this.mainConfig.query.page.name;
        this.query.perPage = this.mainConfig.query.limit.value;
        this.mainService.getCurrentPage().subscribe(data => {
            const oldPage = this.currentPage;
            this.currentPage = data;
            if (this.currentPage !== oldPage) {
                this.getItems();
            }
        });

        this.mainService.getSearchTerm().subscribe(data => {
            const oldSearch = this.searchTerm;
            this.searchTerm = data;
            if (this.searchTerm !== oldSearch) {
                this.getItems();
            }
        });

        // this.mainService.getActiveItem().subscribe(data => {
        //     this.activeItem = data;
        //     this.onSelect.emit(data);
        // });

        // this.mainService.getActiveFacets().subscribe(data => {
        //     this.activeFacets = data;
        //     this.getItems();
        // });

        this.mainService.getReload().subscribe(data => {
            this.getItems();
        });
    }

    /**
     * Appends all current params to query and makes a request storing all resources in
     * the items array
     */
    getItems() {
        let params = new HttpParams();
        params = params.append(this.page, String(this.currentPage));
        params = params.append(this.search.name, this.search.value.replace('$', this.searchTerm));
        params = params.append(this.limit.name, String(this.query.perPage));

        // TODO CHANGE FACETS @atovar
        // if (!isNil(this.activeFacets)) {
        //     for (const key of Object.keys(this.activeFacets)) {
        //         params = params.append(key, this.activeFacets[key]);
        //     }
        // }

        this.isLoading = true;
        this.mainService.list(params).subscribe(
            response => {
                if (response.hasOwnProperty('pager')) {
                    this.query.perPage = response['pager'].per_page;
                    this.query.lastPage = response['pager'].pages;
                    this.query.total = response['pager'].total;
                    this.facets = response['facets'];
                    this.items = {
                        data: response['docs'],
                        pager: new Pager(response['pager'], this.pagerSchema)
                    };
                }
            },
            err => console.error(err),
            () => (this.isLoading = false)
        );
    }

    sendSearch(data: SearchModel) {
        this.query.perPage = data.limit;
        this.currentPage = data.page;
        this.getItems();
    }
}
