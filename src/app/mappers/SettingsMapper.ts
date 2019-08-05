import { XDamSettings } from './../../../projects/xdam/src/lib/models/XdamSettings';
import { isNil, hasIn } from 'ramda';

/**
 * This class extracts and maps data about the components
 * configuration given the active profile.
 */
export default class SettingsMapper extends XDamSettings {
    /**@ignore */
    constructor() {
        const xdam = hasIn('$xdam', window) ? (<any>window).$xdam : {};
        let params = null;
        if (hasIn('settings', xdam)) {
            params = { ...xdam['settings'], form: xdam['form'] };
        }
        super(params);
    }
}
