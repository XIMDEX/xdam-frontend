import { FormI } from './FormI.interface';
import { ListOptions } from './ListOptions.interface';

import { ItemModel } from './ItemModel.interface';
import { SearchOptions } from './SearchModel.interface';
import { PagerOptions } from './PagerOptions.interface';

export interface Settings {
    token?: string;
    base_url: string;
    endpoints: { SettingsEdpoint };
    item_model?: ItemModel;
    base_params?: any;
}

export interface SettingsEndpoint {
    get?: string;
    post?: string;
    delete?: string;
}

export interface XDamSettingsInterface {
    search?: SearchOptions;
    pager?: PagerOptions;
    list?: ListOptions;
    facets?: boolean;
    form?: FormI;
}
