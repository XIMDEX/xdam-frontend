import { ItemModel } from './ItemModel.interface';

export interface ListOptions {
    items?: ListItemOption;
    model?: ItemModel;
}

export interface ListItemOption {
    type?: string;
    title?: string;
    placeholder?: {};
    actions?: ListItemActions;
}

export interface ListItemActions {
    edit?: boolean;
    download?: boolean;
    delete?: boolean;
}
