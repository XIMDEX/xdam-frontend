import { Item } from './../Item';
export type ActionMethods = 'new' | 'edit';

export interface ActionI {
    method: ActionMethods;
    item?: Item;
    data: any;
}
