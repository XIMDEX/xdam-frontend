import { XDamSettingsInterface } from './interfaces/Settings.interface';
import BaseModel from './Base';
import { SearchOptions } from './SearchOptions';
import { ListOptions } from './interfaces/ListOptions.interface';
import { standard } from '../profiles/standard';

export class XDamSettings extends BaseModel implements XDamSettingsInterface {
    private _search: SearchOptions = standard.search;
    private _list: ListOptions = standard.list;

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
}
