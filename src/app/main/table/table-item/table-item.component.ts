import { Component, OnInit, Input } from '@angular/core';
import { faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../../../services/main.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Asset } from 'src/models/Asset';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {
  faDownload = faDownload;
  faEdit = faEdit;
  faTrash = faTrash;
  image = '';
  @Input() item: any;

  constructor(
    private mainService: MainService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.image = this.parseImage();
  }

  parseImage() {
    let img = '';
    switch (this.item.type) {
      case 'image':
        img = this.getResourceImage(this.item.hash);
        break;
      case 'audio':
        img = 'https://via.placeholder.com/200/ef680e/000000?text=Audio';
        break;
      case 'video':
        img = 'https://via.placeholder.com/200/af8282/000000?text=Video';
        break;
      case 'pdf':
        img = this.getResourceImage(this.item.hash);
        break;
      case 'other':
        img = 'https://via.placeholder.com/200/5ab1c9/000000?text=Other';
        break;
    }
    return img;
  }

  getResourceImage(hash) {
    const token = this.mainService.getToken();
    return this.mainService.getRoute(
      'get', 'resources') + '/' + hash + '/image?api_token=' + token + '&size=mini';
  }

  downloadFile() {
    this.mainService.getResource(this.item.hash).subscribe(
      res => {
        const ext = res['result'].data.extension;
        this.mainService.downloadResource(this.item.hash).subscribe(
          response => {
            saveAs(response, this.item.title + '.' + ext);
          }
        );
      }
    );
  }

  deleteFile() {
    this.mainService.deleteResource(this.item.id).subscribe(
      res => {
        this.mainService.setCurrentPage(this.mainService.getCurrentPageValue());
      }
    );
  }

  editFile() {
    let itemData;
    let asset;
    this.mainService.getResource(this.item.hash).subscribe(
      response => {
        itemData = response['result'].data;
        asset = new Asset(
          itemData.title,
          itemData.description,
          itemData.author,
          '',
          null,
          itemData.extension
        );
        const data: Object = {
          id: this.item.id,
          asset: asset
        };
        this.ngxSmartModalService.setModalData(data, 'assets');
        this.ngxSmartModalService.getModal('assets').open();
        this.mainService.setCurrentPage(this.mainService.getCurrentPageValue());
      }
    );
  }
}
