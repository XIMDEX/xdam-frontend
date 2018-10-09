import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { isNil } from 'ramda';
import { QuestionBase } from '../../dyn-form/questions/question-base';
import FormMapper from '../../../mappers/FormMapper';
import { MainService } from '../../../services/main.service';
import { Asset } from '../../../models/Asset';

@Component({
  selector: 'app-assets-modal',
  templateUrl: './assets-modal.component.html',
  styleUrls: ['./assets-modal.component.css']
})

export class AssetsModalComponent implements OnInit {
  faTimes = faTimes;
  faSave = faSave;
  asset = new Asset();
  id = 0;
  edit = false;
  questions: QuestionBase<any>[] = [];
  dynData: any = {};
  resetForms = false;
  fileDir: string;
  blocked = false;
  error = '';
  fileName = '';

  private formMapper: FormMapper;

  constructor(
    private mainService: MainService,
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.formMapper = new FormMapper(this.mainService);
    this.getQuestions();
  }

  getQuestions() {
    this.questions = this.formMapper.getFields();
  }

  setDynData(event) {
    this.dynData = event;
  }

  setFile(files: FileList) {
    this.asset.resource = files.item(0);
  }

  dataHandler() {
    if (this.ngxSmartModalService.getModal('assets').hasData()) {
      this.edit = true;
      const data = this.ngxSmartModalService.getModal('assets').getData();
      this.asset = data.asset;
      this.id = data.id;
      this.fileName = this.asset.title + '.' + this.asset.extension;
      this.createQuestions();
    }
  }

  createQuestions() {
    const fields = this.formMapper.handleForm(this.formMapper.getForms().fields, this.asset);
    this.formMapper.setFields(fields);
    this.questions = fields;
  }

  submit() {
    const formData: FormData = new FormData();
    if (this.edit) {
      formData.append('_method', 'PUT');
    }

    for (const key in this.dynData) {
      this.asset[key] = this.dynData[key];
    }

    for (const key in this.asset) {
      if ((key === 'resource') && isNil(this.asset[key])) {
        continue;
      } else if (isNil(this.asset[key])) {
        this.asset[key] = '';
      }
      formData.append(key, this.asset[key]);
    }
    this.blocked = true;
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
          this.handleResponseError(err.status);
          this.blocked = false;
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
          this.handleResponseError(err.status);
          this.blocked = false;
        }
      );
    }
  }

  handleResponseError(code, details = '') {
    let text = '';
    switch (code) {
      case 500:
        text = 'There was an internal server error, please contact your administrator.';
        break;
      default:
        text = 'There was an unknown error, please try again.';
    }
    this.raiseError(text);
  }

  raiseError(text) {
    this.error = text;
    setTimeout(() => {
      this.error = '';
    }, 3000);
  }

  reset() {
    this.resetForms = true;
    this.asset = new Asset();
    this.ngxSmartModalService.get('assets').removeData();
    this.id = 0;
    this.edit = false;
    this.blocked = false;
    this.fileName = '';
    this.createQuestions();
  }

  close() {
    this.ngxSmartModalService.close('assets');
  }
}