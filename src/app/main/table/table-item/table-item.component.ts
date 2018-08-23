import { Component, OnInit, Input } from '@angular/core';
import { faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../../../services/main.service';
import { environment } from '../../../../environments/environment';

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

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.image = this.getResourceImage(this.item.hash);
  }

  getResourceImage(hash) {
    const token = this.mainService.getToken();
    return this.mainService.getRoute('get', 'resources') + '/' + hash + '/image?api_token=' + token;
  }

  downloadFile() {
    this.mainService.downloadResource(this.item.hash);
  }

  deleteFile() {
    this.mainService.deleteResource(this.item.id).subscribe();
  }
}
