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

    /**
     * Initializes the mapper extracting values from the environment and the active window,
     * prioritising the window object.
     */
    // private init() {
    //     const xdam = hasIn('$xdam', window) ? (<any>window).$xdam : null;
    //     let profile = 'standard';
    //     if (hasIn('profile', xdam)) {
    //         profile = xdam.profile;
    //     }
    //     this.setCurrentProfile(profile);
    //     const result = Object.assign({}, this.currentProfile, xdam);

    //     this.setConfigs(result.configs);
    // }
}
