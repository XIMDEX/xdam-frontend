import { is } from 'ramda';
import BaseModel from './Base';
import { ActionI, ActionMethods } from './interfaces/ActionI.interface';

export class ActionModel extends BaseModel implements ActionI {
    private _method: ActionMethods;
    private _data: any = null;

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

    set data(data: any) {
        this._data = data;
    }
    get data(): any {
        return this._data;
    }

    public toFormData() {
        return this.jsonToFormData(this.data, new FormData());
    }

    private jsonToFormData(obj: any, formData: FormData, prefix: string = '') {
        if (is(Array, obj)) {
            obj.forEach((element, index) => {
                formData = this.jsonToFormData(element, formData, `${prefix}[${index}]`);
            });
            return formData;
        } else if (obj.constructor === FileList) {
            for (let index = 0; index < (obj as FileList).length; index++) {
                formData = this.jsonToFormData((obj as FileList).item(index), formData, `${prefix}[${index}]`);
            }
            return formData;
        } else if (obj.constructor === File) {
            formData.append(prefix, obj);
            return formData;
        }

        for (const key of Object.keys(obj)) {
            const fullkey = prefix + key;
            if ((is(Object, obj[key]) || is(Array, obj[key])) && obj[key].constructor !== File) {
                if (is(Object, obj[key]) && obj[key].constructor !== FileList) {
                    prefix = `${fullkey}.`;
                } else {
                    prefix = fullkey;
                }
                formData = this.jsonToFormData(obj[key], formData, prefix);
                continue;
            }
            formData.append(fullkey, obj[key]);
        }

        return formData;
    }
}
