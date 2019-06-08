import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { MainService } from './services/main.service';
import { XDamData } from '../../projects/xdam/src/lib/models/interfaces/ItemModel.interface';
import { HttpParams } from '@angular/common/http';
import { Pager } from 'projects/xdam/src/lib/models/Pager';
import { PagerModelSchema } from 'projects/xdam/src/lib/models/interfaces/PagerModel.interface';
import { SearchModel } from 'projects/xdam/src/lib/models/SarchModel';
import { XDamSettingsInterface } from 'projects/xdam/src/lib/models/interfaces/Settings.interface';
import { isNil } from 'ramda';

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

    search: SearchModel;
    items: XDamData;
    settings: XDamSettingsInterface;

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
        this.imap = this.mainService.itemModel;
        this.settings = this.mainService.getGeneralConfigs();
        this.search = new SearchModel();

        this.page = 'page';
        this.searchTerm = 'name';
        this.limit = 'limit';

        this.sendSearch(this.search);

        // this.limit = { name: 'limit', value: 20 }; // this.mainConfig.query.limit;
        // this.search = { name: 'name', value: '$' }; // this.mainConfig.query.search;
        // this.page = 'page'; // this.mainConfig.query.page.name;
        // this.query.perPage = 20; // this.mainConfig.query.limit.value;

        // this.mainService.getCurrentPage().subscribe(data => {
        //     const oldPage = this.currentPage;
        //     this.currentPage = data;
        //     if (this.currentPage !== oldPage) {
        //         this.getItems();
        //     }
        // });

        // this.mainService.getSearchTerm().subscribe(data => {
        //     const oldSearch = this.searchTerm;
        //     this.searchTerm = data;
        //     if (this.searchTerm !== oldSearch) {
        //         this.getItems();
        //     }
        // });

        // this.mainService.getActiveItem().subscribe(data => {
        //     this.activeItem = data;
        //     this.onSelect.emit(data);
        // });

        // this.mainService.getActiveFacets().subscribe(data => {
        //     this.activeFacets = data;
        //     this.getItems();
        // });

        // this.mainService.getReload().subscribe(data => {
        //     this.sendSearch(this.search);
        // });
    }

    /**
     * Appends all current params to query and makes a request storing all resources in
     * the items array
     */
    getItems() {
        let params = new HttpParams();
        params = params.append(this.page, String(this.search.page));
        if (!isNil(this.search.content)) {
            params = params.append(this.searchTerm, this.search.content);
        }
        params = params.append(this.limit, String(this.search.limit));

        // TODO CHANGE FACETS @atovar
        // if (!isNil(this.activeFacets)) {
        //     for (const key of Object.keys(this.activeFacets)) {
        //         params = params.append(key, this.activeFacets[key]);
        //     }
        // }

        this.mainService.list(params).subscribe(
            response => {
                if (response.hasOwnProperty('pager')) {
                    this.facets = response['facets'];
                    this.items = {
                        data: response['docs'],
                        pager: new Pager(response['pager'], this.pagerSchema)
                    };
                }
            },
            err => console.error(err)
        );
    }

    sendSearch(data: SearchModel) {
        this.search.update(data);
        this.getItems();
    }
}
