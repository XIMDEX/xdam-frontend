import { Component, OnInit, Injectable } from '@angular/core';
import {AssetsManagerComponent} from './assets-manager/assets-manager.component';
import { MainService } from '../services/main.service';
import { HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';

class Item {
  id: number;
  title: string;
  hash: string;
  size: string;
  type: string;
  constructor(id, tit, h, siz, tp) {
    this.id = id;
    this.title = tit;
    this.hash = h;
    this.size = siz;
    this.type = tp;
  }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  items: Item[] = [];
  query: any = {page: 1, search: '', perPage: 20, lastPage: 1, total: 0};
  limit: number;
  currentPage = 1;
  searchTerm = '';


  constructor(private mainService: MainService) {
    console.log(window);
  }

  ngOnInit() {
    this.getItems();
    this.mainService.getCurrentPage().subscribe( data => {
      this.currentPage = data;
      this.getItems();
    });
    this.mainService.getSearchTerm().subscribe( data => {
      this.searchTerm = data;
      this.getItems();
    });
  }

  getItems() {
    let params = new HttpParams();
    params = params.append('page', String(this.currentPage));
    params = params.append('title', '%' + this.searchTerm + '%');
    this.mainService.list(params).subscribe(
      response => {
        if (response.hasOwnProperty('result')) {
          this.query.perPage = response['result'].per_page;
          this.query.lastPage = response['result'].last_page;
          this.query.total = response['result'].total;
          this.mapItems(response['result'].data);
        }
      },
      err => console.error(err),
      () => console.log('Done loading')

    );
  }

  mapItems(data) {
    this.items = data.map((o) => {
      return new Item(o.id, o.title, o.hash, '100x100', o.type);
    });
  }

}
