import { Settings } from './../../models/interfaces/Settings.interface';
import { FormI } from './../../models/interfaces/FormI.interface';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { hasIn, isNil, is, equals } from 'ramda';
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

    @ViewChild('swalModal') swalModal: SwalComponent;

    private modal;
    private save = false;

    faTimes = faTimes;
    faSave = faSave;
    swalCustomClass = {
        popup: 'xdam-modal-form',
        content: 'xdam-modal-content full'
    };

    formFields: any[] = [];
    formFieldsValues: any = {};
    infoFormFields = itemInfo;

    constructor(public readonly swalTargets: SwalPartialTargets) {
        this.swalCustomClass = { ...swal2.customClass, ...this.swalCustomClass };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (hasIn('action', changes) && !changes.action.isFirstChange() && !isNil(this.swalModal)) {
            if (!isNil(changes.action.currentValue)) {
                this.modal = this.swalModal.show();
            }
        }

        if (
            hasIn('settings', changes) &&
            !isNil(this.swalModal) &&
            !isNil(changes.settings.currentValue) &&
            hasIn('fields', changes.settings.currentValue)
        ) {
            const currFields = changes.settings.currentValue.fields;
            if (!equals(currFields, this.formFields)) {
                this.prepareFormFields(currFields);
            }
        }
    }

    get isEdition(): boolean {
        return this.action.method === 'edit';
    }

    protected prepareFormFields(fields: any) {
        let formFields: any[] = [];
        if (!isNil(fields) && is(Array, fields)) {
            formFields = fields.map(value => {
                const { type, object } = value;
                return setQuestion({ type, ...object });
            });
        }
        this.formFields = fileForm.concat(formFields);
    }

    validForm(): boolean {
        return false;
    }

    cancelForm() {
        this.save = false;
        this.modal.close();
    }

    closeForm() {
        if (this.save) {
            this.save = false;
        }

        this.close.emit();
    }

    updatedValue(key: string, value: any) {
        this.formFieldsValues[key] = value;
        console.log(this.formFieldsValues);
    }
}
