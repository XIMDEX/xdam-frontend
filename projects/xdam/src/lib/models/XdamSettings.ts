import { ListOptions as ListOptionsI } from './interfaces/ListOptions.interface';
import { ListOptions } from './ListOptions';
import { XDamSettingsInterface } from './interfaces/Settings.interface';
import BaseModel from './Base';
import { SearchOptions } from './SearchOptions';
import { standard } from '../profiles/standard';
import { PagerOptions } from './interfaces/PagerOptions.interface';

export class XDamSettings extends BaseModel implements XDamSettingsInterface {
    private _search: SearchOptions = standard.search;
    private _list: ListOptionsI = standard.list;
    private _pager: PagerOptions = standard.pager;
    private _facets: boolean = standard.facets;

    constructor(settings: XDamSettingsInterface) {
        super();
        this.update(settings);
    }

    set search(params: SearchOptions) {
        this._search = params;
    }

    get search(): SearchOptions {
        return this._search;
    }

    set list(params: ListOptions) {
        this._list = new ListOptions(params);
    }

    get list(): ListOptions {
        return this._list as ListOptions;
    }

    set pager(params: PagerOptions) {
        this._pager = params;
    }

    get pager(): PagerOptions {
        return this._pager;
    }

    set facets(params: boolean) {
        this._facets = params;
    }

    get facets(): boolean {
        return this._facets;
    }
}
