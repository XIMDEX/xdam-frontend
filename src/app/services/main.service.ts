import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { hasIn, isNil } from 'ramda';
import RouterMapper from '../../router-mapper/RouterMapper';

// const API = environment.API;
// const resourcesAPI = environment.resourcesAPI;


@Injectable({
  providedIn: 'root'
})
export class MainService {
  private httpOptions = {headers: {}, params: {}};
  private currentPage: BehaviorSubject<number>;
  private searchTerm: BehaviorSubject<string>;

  private token: string = "";
  private settings: RouterMapper;

  constructor(private http:HttpClient) { 
    this.currentPage = new BehaviorSubject<number>(1);
    this.searchTerm = new BehaviorSubject<string>("");
    this.settings = new RouterMapper();

    this.httpOptions.headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization':  "Bearer " + this.getToken()
    });
  }

  getToken() {
    return this.settings.getToken();
  }

  getRoutes() {
    return this.settings.getRoutes();
  }

  getRoute(method: string, name: string) {
    let route = hasIn(name, this.getRoutes()) ? (<any>this.getRoutes())[name] : null;
    if (!isNil(route)) {
      route =  hasIn(method, route) ? `${this.settings.getBaseUrl()}${(route)[method]}` : null;
    }

    console.log('routes', route);
    return route;
  }

  list(params: Object = {}) {
    return this.getResources(params);
  }

  getResources(params: Object = {}){
    const url = this.getRoute('get', 'resources');
    this.httpOptions.params = params;
    if (!hasIn('page', params)) {
      this.getCurrentPage().subscribe(value => {params.page = value});
    }
    return this.http.get(url, this.httpOptions)
  }

  postFileForm(form: FormData){
    const url = this.getRoute('post', 'resources');
    const heads = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization':  "Bearer " + this.getToken(),
      'Accept': 'application/json'});
    return this.http.post(url, form, {headers: heads})
  }

  downloadResource(hash){
    const url = this.getRoute('get', 'resources');
    return this.http.get(url + "/" + hash + "/file");
  }

  setCurrentPage(newPage: number){
    this.currentPage.next(newPage);
  }

  getCurrentPage(): Observable<number>{
    return this.currentPage.asObservable();
  }

  setSearchTerm(newTerm: string){
    this.searchTerm.next(newTerm);
  }

  getSearchTerm(): Observable<string>{
    return this.searchTerm.asObservable();
  }
}
