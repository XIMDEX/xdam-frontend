import { Component, OnInit } from '@angular/core';
import { faSearch, faEraser, faSync } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../../../services/main.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {AssetsModalComponent} from '../../../modals/assets-modal/assets-modal.component';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {
  faSearch = faSearch;
  faEraser = faEraser;
  faSync = faSync;
  term: string = "";

  constructor(
    private mainService: MainService,
    private ngxSmartModalService: NgxSmartModalService) {}

  ngOnInit() {
  }

  search() {
    this.mainService.setSearchTerm(this.term);
  }

  handleResourceModal(){
    this.ngxSmartModalService.getModal('assets').open()
  }

  delete() {
    this.term = "";
    this.search();
  }

}
