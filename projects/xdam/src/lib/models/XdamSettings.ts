import { XDamSettingsInterface } from './interfaces/Settings.interface';
import BaseModel from './Base';
import { SearchOptions } from './SearchOptions';
import { ListOptions } from './interfaces/ListOptions.interface';
import { standard } from '../profiles/standard';
import { PagerOptions } from './interfaces/PagerOptions.interface';

export class XDamSettings extends BaseModel implements XDamSettingsInterface {
    private _search: SearchOptions = standard.search;
    private _list: ListOptions = standard.list;
    private _pager: PagerOptions = standard.pager;

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
        this._list = params;
    }

    get list(): ListOptions {
        return this._list;
    }

    set pager(params: PagerOptions) {
        this._pager = params;
    }

    get pager(): PagerOptions {
        return this._pager;
    }
}
