import { Component, OnInit } from '@angular/core';
import { hasIn, isNil } from 'ramda';

import { ActionModel } from '@xdam/models/ActionModel';
import { HttpParams } from '@angular/common/http';
import { Item } from '@xdam/models/Item';
import { MainService } from './services/main.service';
import { Pager } from '@xdam/models/Pager';
import { PagerModelSchema } from '@xdam/models/interfaces/PagerModel.interface';
import { SearchModel } from '@xdam/models/SearchModel';
import { XDamData } from '@xdam/models/interfaces/ItemModel.interface';
import { XDamSettingsInterface } from '@xdam/models/interfaces/Settings.interface';

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
    default = true;
    action: ActionModel | null = null;

    private pagerSchema: PagerModelSchema = {
        total: 'total',
        currentPage: 'current_page',
        lastPage: 'last_page',
        nextPage: 'next_page',
        prevPage: 'prev_page',
        perPage: {
            value: 'per_page'
        }
    };

    constructor(private mainService: MainService) {}

    ngOnInit() {
        this.settings = this.mainService.getGeneralConfigs();
        this.search = new SearchModel();

        this.page = 'page';
        this.searchTerm = 'search';
        this.limit = 'limit';

        this.sendSearch(this.search);
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
        if (!isNil(this.search.facets)) {
            Object.keys(this.search.facets).forEach(index => {
                const value = this.search.facets[index];
                params = params.append(`facets[${index}]`, value.join(','));
            });
        }
        params = params.append('default', this.default ? '1' : '0');
        params = params.append(this.limit, String(this.search.limit));

        this.mainService.list(params).subscribe(
            response => {
                const { data } = response as any;
                this.items = {
                    data: data['data'],
                    pager: new Pager(data, this.pagerSchema),
                    facets: data['facets']
                };
                if (this.default) {
                    this.getDefaultFacet(data['facets']);
                }
            },
            err => console.error(err)
        );
    }

    getDefaultFacet(data) {
        const facets = {};

        data.map(({ key, default: defFacet = null }) => {
            if (!isNil(defFacet)) {
                facets[key] = [defFacet];
            }
        });

        this.default = false;
        this.search.update({ facets });
    }

    sendSearch(data: SearchModel) {
        this.search.update(data);
        this.getItems();
    }

    downloadItem(item: Item) {
        this.mainService.downloadResource(item).subscribe(
            response => {
                const url = window.URL.createObjectURL(response);
                const downloadFile = document.createElement('a');
                document.body.appendChild(downloadFile);

                downloadFile.style.display = 'none';
                downloadFile.href = url;
                downloadFile.download = item.title;
                downloadFile.click();
                downloadFile.remove();

                window.URL.revokeObjectURL(url);
            },
            err => console.error(err)
        );
    }

    deleteItem(item: Item) {
        this.mainService
            .delete(item)
            .subscribe(
                response => {},
                err => {
                    console.error(err);
                }
            )
            .add(() => {
                this.getItems();
            });
    }

    damAction(data: ActionModel) {
        const action = new ActionModel(data);
        let actionType = null;

        if (action.method === 'show') {
            actionType = this.mainService.getResource(action);
        } else {
            actionType = this.mainService.saveForm(action);
        }

        actionType
            .subscribe(
                ({ result }) => {
                    const { data } = result as any;
                    action.data = data;
                    action.status = 'success';
                },
                ({ error, message, statusText }) => {
                    action.status = 'fail';
                    if (hasIn('errors', error)) {
                        action.errors = error.errors;
                    }
                }
            )
            .add(() => {
                if (action.method !== 'show') {
                    this.getItems();
                }
                this.action = action;
            });
    }
}
