import { XDamSettingsInterface } from './interfaces/Settings.interface';
import { SearchOptions } from './SearchOptions';
import BaseModel from './Base';

export class XDamSettings extends BaseModel implements XDamSettingsInterface {
    private _search: SearchOptions = {
        input: {
            hasSearch: true,
            hasReset: true,
            hasClear: true
        }
    };

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
}
