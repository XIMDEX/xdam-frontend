import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-assets-modal',
  templateUrl: './assets-modal.component.html',
  styleUrls: ['./assets-modal.component.css']
})

export class AssetsModalComponent implements OnInit {
  faTimes = faTimes;
  faSave = faSave;
  asset = new Asset("", "", "", "", null);
  constructor(  
    private mainService: MainService,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
  }

  setFile(files: FileList){
    this.asset.resource= files.item(0);
  }

  submit(){
    let formData: FormData = new FormData();
    for (let key in this.asset) {
      if(key === "resource"){
        formData.append(key, this.asset[key])
      }else{
        formData.append(key, this.asset[key])
        
      }
      
    }
    this.mainService.postFileForm(formData).subscribe(
      suc => {
        this.mainService.setCurrentPage(1);
        this.close();
      },
      err => {
        console.log("error", err)
      }
    );

  }

  close(){
    this.asset = new Asset("", "", "", "", null);
    this.ngxSmartModalService.close('assets');
  }
}

class Asset {
  title: string;
  description: string;
  author: string;
  externalUrl: string;
  resource: File;
  constructor(title, desc, aut, url, f) {
    this.title = title;
    this.description = desc;
    this.author = aut;
    this.externalUrl = url;
    this.resource = f
  }
}
