import { sprintf } from 'sprintf-js';
import { ActionModel } from './../../../projects/xdam/src/lib/models/ActionModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { hasIn, isNil } from 'ramda';
import { Item } from '../../../projects/xdam/src/lib/models/Item';
import RouterMapper from '../mappers/RouterMapper';
import SettingsMapper from '../mappers/SettingsMapper';

// const API = environment.API;
// const resourcesAPI = environment.resourcesAPI;

/**
 * Service who acts as a global state for the application.
 */
@Injectable({
    providedIn: 'root'
})
export class MainService {
    /**
     * Dict containing options for using with the http client
     */
    private httpOptions = { headers: {}, params: {} };

    /**
     * An instance of the RouterMapper
     */
    private router: RouterMapper;

    /**
     * An instance of the ConfigMapper
     */
    private configs: SettingsMapper;

    /**
     * The application endpoint for queries
     */
    private endPoint = 'resources';

    /**
     * @ignore
     */
    constructor(private http: HttpClient) {
        this.router = new RouterMapper();
        this.configs = new SettingsMapper();

        this.httpOptions.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.getToken()
        });
    }

    getBaseUrl() {
        return this.router.baseUrl;
    }

    /**
     * Gets the token parsed by the mapper.
     */
    getToken() {
        return this.router.token;
    }

    /**
     * Gets the queries routes parsed by the mapper.
     */
    getRoutes() {
        return this.router.routes;
    }

    /**
     * Create the complete API route used for queries.
     * @param {string} method The desired method from the settings
     * @param {string} name The name of the endpoint
     */
    getRoute(method: string, name: string) {
        let route = hasIn(name, this.getRoutes()) ? (<any>this.getRoutes())[name] : null;
        if (!isNil(route)) {
            route = hasIn(method, route) ? `${this.router.baseUrl}${route[method]}` : null;
        }
        return route;
    }

    /**
     * Gets general profile configs from the active profile.
     */
    getGeneralConfigs() {
        return this.configs;
    }

    /**
     * Gets the desired component profile config from the active profile.
     * @param component The desired component
     */
    getComponentConfigs(component = null) {
        return this.configs.get(component);
    }

    /**
     * Calls getResources method with the desired request parameters.
     * @param params The parameters
     * @returns {Observable} The response of getResources
     */
    list(params: HttpParams = null) {
        return this.getResources(params);
    }

    /**
     * Builds a query and fetchs data from the API.
     * @param {string} end The API endpoint
     * @param {string} key The key of the parameter in the params dict
     * @param {string} param The parameter to assign in the params dict
     * @returns {Observable} The response as a observable
     */
    getOptions(end: string, key: string, param: string) {
        const url = `${this.getBaseUrl()}${end}`;
        const params = {};
        params[key] = param;
        const heads = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.getToken(),
            Accept: 'application/json'
        });
        return this.http.get(url, { headers: heads, params: params });
    }

    /**
     * Fetchs all the resources from the API.
     * @param {Object} params The parameters dict for the query
     * @returns {Observable} The response as a observable
     */
    getResources(params: HttpParams = null) {
        const url = this.getRoute('list', this.endPoint);
        params = this.router.getBaseParams(params);
        this.httpOptions.params = params;
        return this.http.get(url, this.httpOptions);
    }

    /**
     * Gets a single resource from the API.
     * @param id The identifier of the resource
     * @returns {Observable} The response as a observable
     */
    getResource(id) {
        const url = this.getRoute('get', this.endPoint);
        return this.http.get(url + '/' + id, this.httpOptions);
    }

    /**
     * Receives a FormData object and send the form to the server.
     * @param {FormData} form The form to be sent
     * @returns {Observable} The response as a observable
     */
    saveForm(data: ActionModel) {
        const heads = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.getToken(),
            Accept: 'application/json'
        });

        const item = data.item;
        const method = data.method === 'new' ? 'post' : 'put';
        const formData = data.toFormData();
        let url = this.getRoute(method, this.endPoint);
        url = sprintf(url, item);

        if (method === 'put') {
            formData.append('_method', 'PUT');
        }

        return this.http.post(url, formData, { headers: heads });
    }

    /**
     * Downloads a resource as a blob given its ID.
     * @param id The resource ID
     * @returns {Observable} The response as a observable
     */
    downloadResource(id) {
        const url = this.getRoute('get', this.endPoint);
        const heads = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + this.getToken()
        });
        return this.http.get(url + '/' + id + '/file', { headers: heads, responseType: 'blob' });
    }

    /**
     * Deletes a resource from the server given its ID.
     * @param id The resource ID
     * @returns {Observable} The response as a observable
     */
    delete(id) {
        const url = this.getRoute('delete', this.endPoint);
        return this.http.delete(url + '/' + id, { headers: this.httpOptions.headers });
    }
}
