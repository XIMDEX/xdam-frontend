import { hasIn } from 'ramda';

export default class BaseModel {
    get(setting: string): any {
        let value = null;
        if (hasIn(setting, this)) {
            value = this[setting];
        }
        return value;
    }

    update(params: any) {
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
