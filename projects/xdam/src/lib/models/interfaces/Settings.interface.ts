import { ItemModel } from './ItemModel.interface';
import { SearchOptions } from './SearchModel.interface';
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
}
