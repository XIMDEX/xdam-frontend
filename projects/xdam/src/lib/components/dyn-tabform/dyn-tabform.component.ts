import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QuestionBase } from '../dyn-form/questions/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../dyn-form/questions/question-control.service';

@Component({
  selector: 'app-dyn-tabform',
  templateUrl: './dyn-tabform.component.html',
  styleUrls: ['./dyn-tabform.component.css'],
  providers: [ QuestionControlService ]
})
export class DynTabformComponent implements OnInit, OnChanges {
  @Input() tabs: any[] = [];
   /**
   * The array of questions
   */
  questions: QuestionBase<any>[] = [];
  /**
   * The angular form group instance
   */
  tabform: FormGroup;
  /**
   * The payload input with all the data
   */
  @Input()
  payLoad = {};
  /**
   * An emitter to emit the data form after finished
   */
  @Output()
  sendForm = new EventEmitter<any>();

  @Input()
  title = '';

  show = false;

  constructor(private qcs: QuestionControlService) { }

  ngOnInit() {
    this.tabform.valueChanges.subscribe(data => {
      this.sendForm.emit(data);
    });
  }

  ngOnChanges() {
    this.questions = [];
    this.tabs.map( (tab) => {
      this.questions = this.questions.concat(tab.questions);
    });
    this.tabform = this.qcs.toFormGroup(this.questions);
    this.tabform.valueChanges.subscribe(data => {
      this.sendForm.emit(data);
    });
  }

  /**
   * Sends the data as a json string when submitted
   */
  onSubmit() {
    this.payLoad = JSON.stringify(this.tabform.value);
  }

  toggleVisible() {
    this.show = !this.show;
  }


}
