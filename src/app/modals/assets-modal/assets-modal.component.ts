import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import {MainService} from '../../services/main.service';
import { Asset } from 'src/models/Asset';
import { isNil } from 'ramda';

@Component({
  selector: 'app-assets-modal',
  templateUrl: './assets-modal.component.html',
  styleUrls: ['./assets-modal.component.css']
})

export class AssetsModalComponent implements OnInit {
  faTimes = faTimes;
  faSave = faSave;
  asset = new Asset('', '', '', '', '', null);
  id = 0;
  edit = false;

  constructor(
    private mainService: MainService,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
  }

  setFile(files: FileList) {
    this.asset.resource = files.item(0);
  }

  updateData() {
    if (this.ngxSmartModalService.getModal('assets').hasData()) {
      this.edit = true;
      const data = this.ngxSmartModalService.getModal('assets').getData();
      this.asset = data.asset;
      this.id = data.id;
    }
  }

  submit() {
    const formData: FormData = new FormData();
    if (this.edit) {
      formData.append('_method', 'PUT');
    }

    for (const key in this.asset) {
      if (key === 'resource' && isNil(this.asset[key])) {
        continue;
      }
      formData.append(key, this.asset[key]);
    }
    this.sendFile(formData);
  }

  sendFile(form: FormData) {
    if (!this.edit) {
      this.mainService.postFileForm(form).subscribe(
        suc => {
          this.mainService.setCurrentPage(1);
          this.close();
        },
        err => {
          console.log('error', err);
        }
      );
    } else {
      this.mainService.putFileForm(form, this.id).subscribe(
        suc => {
          this.mainService.setCurrentPage(1);
          this.close();
        },
        err => {
          console.log('error', err);
        }
      );
    }
  }

  reset() {
    this.asset = new Asset('', '', '', '', '' , null);
    this.ngxSmartModalService.get('assets').removeData();
  }

  close() {
    this.ngxSmartModalService.close('assets');
  }
}
