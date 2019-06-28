import { ActionMethods } from './../../models/interfaces/ActionI.interface';
import { FormI } from './../../models/interfaces/FormI.interface';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { hasIn, isNil, is, equals, clone } from 'ramda';
import { ActionModel } from './../../models/ActionModel';
import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SwalPartialTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import swal2 from '../../profiles/swal2';
import { setQuestion } from '../../models/forms/question';
import { itemInfo, fileForm } from '../../profiles/forms';

@Component({
    selector: 'xdam-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnChanges {
    @Input() action: ActionModel | null;
    @Input() settings: FormI;

    @Output() close = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();

    @ViewChild('swalModal') swalModal: SwalComponent;

    private modal;

    faTimes = faTimes;
    faSave = faSave;
    swalCustomClass = {
        popup: 'xdam-modal-form',
        content: 'xdam-modal-content full'
    };

    formFields: any[] = fileForm;
    tabsForms: any[] = [];

    oldFormFields: any[] = [];
    oldTabsForms: any[] = [];
    oldInfoFormFields: any[] = [];

    formFieldsValues: any = {};
    infoFormFields = itemInfo;
    method: ActionMethods;

    constructor(public readonly swalTargets: SwalPartialTargets) {
        this.swalCustomClass = { ...swal2.customClass, ...this.swalCustomClass };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (hasIn('settings', changes) && !isNil(this.swalModal) && !isNil(changes.settings.currentValue)) {
            for (const form of changes.settings.currentValue) {
                if (hasIn('fields', form) && !isNil(form.fields)) {
                    this.setFormFields(form.fields);
                } else if (hasIn('tabs', form) && !isNil(form.tabs)) {
                    this.setTabsForm(form);
                }
            }
        }

        if (hasIn('action', changes) && !changes.action.isFirstChange() && !isNil(this.swalModal)) {
            if (!isNil(changes.action.currentValue)) {
                this.modal = this.swalModal.show();
                this.method = this.action.method;

                if (this.action.method === 'show') {
                    this.method = 'edit';
                    const mainForm = this.action.data;
                    const tabsForm = hasIn('tabsform', mainForm) && isNil(mainForm.tabsform) ? mainForm.tabsform : [];

                    if (hasIn('tabsform', mainForm)) {
                        delete mainForm.tabsform;
                    }

                    this.setFormValues(mainForm, this.formFields, this.oldFormFields);
                    this.setFormValues(mainForm, this.infoFormFields, this.oldInfoFormFields);
                }
            }
        }
    }

    get isEdition(): boolean {
        return this.action.method === 'edit';
    }

    protected setTabsForm(form: any) {
        let name: string | null = null;
        let title: string | null = null;
        let tabs: any[] = [];
        if (hasIn('name', form)) {
            name = form.name;
        }

        if (hasIn('title', form)) {
            title = form.title;
        }

        if (!isNil(name) && isNil(title)) {
            title = name;
        }

        if (hasIn('tabs', form) && is(Array, form.tabs)) {
            form.tabs.forEach(tabForm => {
                let title = 'Form';
                let fields = [];
                if (hasIn('title', tabForm)) {
                    title = tabForm.title;
                }

                if (hasIn('fields', tabForm)) {
                    fields = this.prepareFormsFields(tabForm.fields, name);
                    tabs.push({ title, fields });
                }
            });
        }

        if (!isNil(name) && !isNil(title) && tabs.length > 0) {
            this.tabsForms.push({
                title,
                name,
                tabs
            });
        }
    }

    protected setFormFields(fields: any) {
        if (!equals(fields, this.formFields)) {
            this.formFields = this.formFields.concat(this.prepareFormsFields(fields));
        }
    }

    protected prepareFormsFields(fields: any, prefix: string = null) {
        let formFields: any[] = [];
        if (!isNil(fields) && is(Array, fields)) {
            formFields = fields.map(value => {
                const { type, object } = value;
                return setQuestion({ type, ...object }, prefix);
            });
        }
        return formFields;
    }

    validForm(): boolean {
        return false;
    }

    cancelForm() {
        this.modal.close();
    }

    closeForm() {
        this.formFieldsValues = {};
        if (this.oldFormFields.length > 0) {
            this.formFields = clone(this.oldFormFields);
            this.oldFormFields = [];
        }

        if (this.oldInfoFormFields.length > 0) {
            this.infoFormFields = clone(this.oldInfoFormFields);
            this.oldInfoFormFields = [];
        }

        if (this.oldTabsForms.length > 0) {
            this.tabsForms = clone(this.oldTabsForms);
            this.oldTabsForms = [];
        }

        this.close.emit();
    }

    saveForm() {
        const action = { ...this.action } as ActionModel;
        action.data = this.formFieldsValues;
        this.save.emit(action);
    }

    setFormValues(data: any, form: any[], cloneForm: any[]) {
        cloneForm = clone(form);
        for (const field of form) {
            if (hasIn(field.key, data)) {
                field.value = data[field.key];
            } else if (hasIn(field.realName, data)) {
                field.value = data[field.realName];
            }
        }
    }

    updatedValue(key: string, value: any) {
        const keys = key.split('.');
        this.formFieldsValues = this.formFieldToFormFieldsValue(keys, value, { ...this.formFieldsValues });
    }

    protected formFieldToFormFieldsValue(keys: string[], value: any, obj: any) {
        const key = keys.shift();
        if (!hasIn(key, this.formFieldsValues)) {
            obj[key] = {};
        }

        if (keys.length > 0) {
            obj[key] = this.formFieldToFormFieldsValue(keys, value, obj[key]);
        } else {
            obj[key] = value;
        }

        return obj;
    }
}
