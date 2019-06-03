import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question-base';
import { hasIn } from 'ramda';
import { MainService } from '../../../../services/main.service';
import { TextboxQuestion } from '../question-textbox';
import { TextAreaQuestion } from '../question-textarea';
import { DepDropQuestion } from '../question-depdrop';
import { DropdownQuestion } from '../question-dropdown';

/**
 * Component extracted from the Angular docs for creating dynamic questions
 * for dynamic forms.
 */
@Component({
    selector: 'app-question',
    templateUrl: './dyn-question.component.html'
})
export class DynQuestionComponent implements OnInit {
    /**
     * A question to be processed
     */
    @Input() question: QuestionBase<any>;

    /**
     * The form group where this question belongs to
     */
    @Input() form: FormGroup;

    constructor(private mainService: MainService) { }

    ngOnInit() {
        if (hasIn('ref', this.question)) {
            this.form.get(this.question['ref']).valueChanges.subscribe(val => {
                this.searchOptions();
            });
        }
        if (this.question.controlType === 'dropdown' && this.question['fetchable']) {
            this.getOptions();
        }
    }

    /**
     * Returns the validity of the form control for the question
     * @returns {Boolean} True if valid, False otherwise
     */
    get isValid() { return this.form.controls[this.question.key].valid; }

    /**
     * Gets the options for the depdrop component
     */
    searchOptions() {
        const value = this.form.get(this.question['ref']).value;
        if (value !== '') {
            this.mainService.getOptions(
                this.question['endpoint'], this.question['param'], value
            ).subscribe(resp => {
                this.question['options'] = [];
                this.question['options'] = resp['result'].data.map(
                    item => (
                        {
                            key: item[this.question['map'].key], value: item[this.question['map'].value]
                        })
                );
            });
        }
    }

    /**
     * Gets the options for the dropdown component
     */
    getOptions() {
        this.mainService.getOptions(this.question['endpoint'], '', '').subscribe(
            resp => {
                this.question['options'] = [];
                this.question['options'] = resp['result'].data.map(
                    item => (
                        {
                            key: item[this.question['map'].key], value: item[this.question['map'].value]
                        })
                );
            });
    }

  asTextbox(): TextboxQuestion {
    return this.question as TextboxQuestion;
  }

  asTextArea(): TextAreaQuestion {
    return this.question as TextAreaQuestion;
  }

  asDropDown(): DropdownQuestion {
    return this.question as DropdownQuestion;
  }

  asDepDrop(): DepDropQuestion {
    return this.question as DepDropQuestion;
  }
}