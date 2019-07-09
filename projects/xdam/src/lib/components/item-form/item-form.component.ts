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
    @Input() display: boolean;

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
                this.method = this.action.method;
                this.oldInfoFormFields = clone(this.infoFormFields);
                this.oldFormFields = clone(this.formFields);

                if (this.action.method === 'show') {
                    this.action.status = 'pending';
                    this.method = 'edit';
                    const mainForm = this.action.data;
                    const tabsForm = hasIn('tabsform', mainForm) && isNil(mainForm.tabsform) ? mainForm.tabsform : [];

                    if (hasIn('tabsform', mainForm)) {
                        delete mainForm.tabsform;
                    }

                    this.setFormValues(mainForm, this.formFields);
                    this.setFormValues(mainForm, this.infoFormFields);
                }

                if (!isNil(this.action.errors)) {
                    const mainForm = this.action.errors;
                    const tabsForm = hasIn('tabsform', mainForm) && isNil(mainForm.tabsform) ? mainForm.tabsform : [];

                    if (hasIn('tabsform', mainForm)) {
                        delete mainForm.tabsform;
                    }

                    this.setFormErrors(mainForm, this.formFields);
                    this.setFormErrors(mainForm, this.infoFormFields);
                }
            }
        }

        if (
            hasIn('display', changes) &&
            !changes.display.isFirstChange() &&
            !isNil(this.swalModal) &&
            !isNil(this.formFields)
        ) {
            if (this.display) {
                this.modal = this.swalModal.show();
            } else {
                this.modal.close();
            }
        }
    }

    get isEdition(): boolean {
        return this.action.method === 'edit';
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
        const action = new ActionModel({ ...this.action });
        action.data = this.formFieldsValues;
        action.method = this.method;
        this.save.emit(action);
    }

    setFormValues(data: any, form: any[]) {
        for (const field of form) {
            let key = null;
            if (hasIn(field.key, data)) {
                key = field.key;
            } else if (hasIn(field.realName, data)) {
                key = field.realName;
            }
            if (!isNil(key)) {
                let value = data[key];
                if (hasIn('map', field) && !isNil(field.map)) {
                    const map = field.map;
                    if (is(Array, value)) {
                        value = value.map(data => {
                            return data[map.key];
                        });
                    } else if (is(Object, value)) {
                        value = value[map.key];
                    }
                }
                field.value = value;
                this.updatedValue(key, value);
            }
        }
    }

    setFormErrors(data: any, form: any[]) {
        for (const field of form) {
            let key = null;
            if (hasIn(field.key, data)) {
                key = field.key;
            } else if (hasIn(field.realName, data)) {
                key = field.realName;
            } else if (hasIn('errors', field)) {
                field.errors = [];
            }

            if (!isNil(key)) {
                field.errors = data[key];
            }
        }
    }

    updatedValue(key: string, value: any) {
        const keys = key.split('.');
        this.formFieldsValues = this.formFieldToFormFieldsValue(keys, value, { ...this.formFieldsValues });
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
