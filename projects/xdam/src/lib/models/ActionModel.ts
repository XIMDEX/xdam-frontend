import BaseModel from './Base';
import { ActionI, ActionMethods } from './interfaces/ActionI.interface';

export class ActionModel extends BaseModel implements ActionI {
    private _method: ActionMethods;

    constructor(params: ActionI = null) {
        super();
        this.update(params);
    }

    set method(method: ActionMethods) {
        this._method = method;
    }

    get method(): ActionMethods {
        return this._method;
    }
}
