import { hasIn, isNil } from 'ramda';
import { environment } from './environment';
import { HttpParams } from '@angular/common/http';
import { Settings } from '../models/Settings.interface';
import { isFunction } from 'util';

/**
 * Mapper class for routes and models configurations in index or environment file
 */
export default class RouterMapper {
    protected readonly loadType = {
        window: () => (hasIn('$xdam', window) ? (<any>window).$xdam : null),
        property: null,
        url: null
    };

    /**
     * The base URL for all requests
     */
    baseUrl = '';
    /**
     * The availables routes in API for the requests
     */
    routes = '';
    /**
     * The auth token for requests
     */
    token = '';
    /**
     * The backend to frontend model mappers
     */
    models = null;
    /**
     * The base parameters for all queries
     */
    baseParams = null;

    /**
     * @ignore
     */
    constructor() {
        this.init();
    }

    /**@ignore */
    setBaseUrl(url: string) {
        this.baseUrl = url;
        return this;
    }

    /**@ignore */
    getBaseUrl() {
        return this.baseUrl;
    }

    /**@ignore */
    setRoutes(routes) {
        this.routes = routes;
        return this;
    }

    /**@ignore */
    getRoutes() {
        return this.routes;
    }

    /**@ignore */
    setToken(token) {
        this.token = token;
        return this;
    }

    /**@ignore */
    getToken() {
        return this.token;
    }

    /**@ignore */
    setModels(models) {
        this.models = models;
        return this;
    }

    /**@ignore */
    getModels() {
        return this.models;
    }

    /**@ignore */
    setBaseParams(params) {
        this.baseParams = params;
        return this;
    }

    /**@ignore */
    getBaseParams(params: HttpParams) {
        for (const key of Object.keys(this.baseParams)) {
            params = params.append(key, String(this.baseParams[key]));
        }
        return params;
    }

    /**@ignore */
    protected urlParams() {
        const url = new URL(window.location.href);
        return url.searchParams;
    }

    /**
     * Initializes the mapper extracting values from the environment and the active window,
     * prioritising the window object.
     */
    private init() {
        const xdam = this.loadProperties();

        const result = Object.assign({}, environment, xdam);
        this.setBaseUrl(result.base_url)
            .setToken(result.token)
            .setRoutes(result.endpoints)
            .setModels(result.models)
            .setBaseParams(result.base_params);
    }

    private loadProperties(props: Settings | null = null) {
        if (isNil(props)) {
            for (const type of Object.values(this.loadType)) {
                props = isFunction(type) ? type() : type;
                if (!isNil(props)) {
                    break;
                }
            }
        }
        return props;
    }
}
