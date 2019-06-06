import { hasIn } from 'ramda';
import { SearchModel as SearchModelI } from './SearchModel.interface';

export class SearchModel implements SearchModelI {
    private _limit: number = 20;

    set limit(limit: number | null) {
        this._limit = limit;
    }
    get limit(): number | null {
        return this._limit;
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
