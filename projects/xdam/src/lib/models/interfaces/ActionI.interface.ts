import { Item } from './../Item';
export type ActionMethods = 'new' | 'edit' | 'show';

export interface ActionI {
    method: ActionMethods;
    item?: Item;
    data: any;
}
