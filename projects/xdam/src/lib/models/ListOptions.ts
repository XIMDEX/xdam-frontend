import { ItemModel } from './interfaces/ItemModel.interface';
import { ListOptions as ListOptionsI, ListItemOption } from './interfaces/ListOptions.interface';
import BaseModel from './Base';
import { standard } from '../profiles/standard';

export class ListOptions extends BaseModel implements ListOptionsI {
    private _items: ListItemOption = standard.list.items;
    private _model: ItemModel = null;

    public constructor(options: ListOptionsI) {
        super();
        this.update(options);
    }

    set items(items: ListItemOption) {
        this._items = items;
    }
    get items(): ListItemOption {
        return this._items;
    }

    set model(model: ItemModel) {
        this._model = model;
    }
    get model(): ItemModel {
        return this._model;
    }
}
