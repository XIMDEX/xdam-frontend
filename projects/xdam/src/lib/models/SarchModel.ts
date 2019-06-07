import { hasIn, isNil } from 'ramda';
import { SearchModel as SearchModelI } from './interfaces/SearchModel.interface';

export class SearchModel implements SearchModelI {
    private _limit: number = 20;
    private _page: number = 1;

    set limit(limit: number | null) {
        if (!isNil(limit) && limit <= 0) {
            limit = 1;
        }
        this._limit = limit;
    }
    get limit(): number | null {
        return this._limit;
    }

    set page(page: number | null) {
        if (!isNil(page) && page <= 0) {
            page = 1;
        }
        this._page = page;
    }
    get page(): number | null {
        return this._page;
    }

    update(params: SearchModel) {
        Object.keys(params).forEach(key => {
            let method = key;
            if (key.startsWith('_')) {
                method = method.slice(1);
            }

            if (hasIn(method, this)) {
                this[method] = params[key];
            }
        });
    }
}
