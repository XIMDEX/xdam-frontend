import { hasIn, isNil } from 'ramda';
import {environment} from './environment';
import { MainService } from '../app/services/main.service';
import { DropdownQuestion } from '../app/dyn-form/questions/question-dropdown';
import { TextboxQuestion } from '../app/dyn-form/questions/question-textbox';
import { DepDropQuestion } from '../app/dyn-form/questions/question-depdrop';
import { QuestionBase } from '../app/dyn-form/questions/question-base';

export default class FormMapper {

    forms = null;
    private fields: QuestionBase<Object>[] = null;
    private mainService: MainService;

    constructor(mainService: MainService) {
        this.mainService = mainService;
        this.init();
    }

    setForms(forms) {
        this.forms = forms;
        return this;
    }

    getForms() {
        return this.forms;
    }

    getFields() {
        return this.fields;
    }

    private initForm(){
        const localForm = this.getForms();
        if(localForm.api === true) {
            this.mainService.getForm().subscribe(response => {
                const rawFields = response["result"].data.fields;
                this.fields = this.handleForm(rawFields);
            });
        }else {
            this.fields = this.handleForm(localForm.fields);
        }
      }
    
    handleForm(raw) {
        let newFields = raw.map(field => {
            let object = null;
            switch (field.type) {
            case "dropdown":
                object = new DropdownQuestion(field.object);
                break;
            
            case "text":
                object = new TextboxQuestion(field.object);
                break;
    
            case "depdrop":
                object = new DepDropQuestion(field.object);
                break;
                
            default:
                break;
            }
            return object;
        });
        return newFields.sort( (a,b) => a.order - b.order );
    }

    private init() {
        const xdam = hasIn('$xdam', window) ? (<any>window).$xdam : null;

        const result = Object.assign({}, environment, xdam);
        this.setForms(result.forms)
            .initForm();
    }
}
