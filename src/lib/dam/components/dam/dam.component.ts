import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Item } from '../../models/Item';
import { MainService } from '../../services/main.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-dam',
  templateUrl: './dam.component.html',
  styleUrls: ['./dam.component.css']
})
export class DamComponent  implements OnInit, OnChanges {
  items: Item[] = [];
  query: any = {page: 1, search: '', perPage: 20, lastPage: 1, total: 0};
  limit = null;
  search = null;
  page: string;
  currentPage = 1;
  searchTerm = '';
  mainConfig = null;
  activeItem = null;

  @Input() popup = false;
  @Input() isOpen = false;
  @Output() openEmitter = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<Item>();

  constructor(
    private mainService: MainService,
    private ngxSmartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.mainConfig = this.mainService.getComponentConfigs('main');
    this.limit = this.mainConfig.query.limit;
    this.search = this.mainConfig.query.search;
    this.page = this.mainConfig.query.page.name;
    this.getItems();
    this.mainService.getCurrentPage().subscribe( data => {
      this.currentPage = data;
      this.getItems();
    });
    this.mainService.getSearchTerm().subscribe( data => {
      this.searchTerm = data;
      this.getItems();
    });
    this.mainService.getActiveItem().subscribe( data =>{
      this.activeItem = data;
      this.onSelect.emit(data);
    });
  }

  ngOnChanges() {
    this.openModal();
  }

  getItems() {
    let params = new HttpParams();
    params = params.append(this.page, String(this.currentPage));
    params = params.append(this.search.name, this.search.value.replace('$', this.searchTerm));
    params = params.append(this.limit.name, String(this.limit.value));
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
      return new Item(o.id, o.title, o.hash, 'Undefined', o.type);
    });
  }

  openModal() {
    if (this.isOpen) {
      this.ngxSmartModalService.getModal('dam').open();
      this.isOpen = false;
      this.openEmitter.emit(false);
    }
  }

}
