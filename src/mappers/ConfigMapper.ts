import { isNil, hasIn } from 'ramda';
import {environment} from './environment';

export default class ConfigMapper {

    private generalConfigs = null;
    private componentConfigs = null;

    constructor(){
        this.init();
    }

    setConfigs(configs){
        this.generalConfigs = configs.general;
        this.componentConfigs = configs.components;
        return this;
    }

    getGeneralConfigs() {
        return this.generalConfigs;
    }

    getComponentConfigs(component = null) {
        if(isNil(component)) {
            return this.componentConfigs;
        } else if (hasIn(component, this.componentConfigs)) {
            return this.componentConfigs[component];
        } else {
            return null;
        }
    }

    private init() {
        const xdam = hasIn('$xdam', window) ? (<any>window).$xdam : null;
        const result = Object.assign({}, environment, xdam);

        this.setConfigs(result.configs)
    }

}