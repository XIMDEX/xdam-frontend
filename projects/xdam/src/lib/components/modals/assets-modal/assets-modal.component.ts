import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { isNil } from 'ramda';
import { QuestionBase } from '../../dyn-form/questions/question-base';
import FormMapper from '../../../mappers/FormMapper';
import { MainService } from '../../../services/main.service';
import { Asset } from '../../../models/Asset';
import TabsFormMapper from '../../../mappers/TabsFormMapper';

/**
 * Modal component used as a single instance for all the application lifecycle that holds the data
 * of the currently selected resource or allows the creation of a new one.
 */
@Component({
    selector: 'xdam-assets-modal',
    templateUrl: './assets-modal.component.html',
    styleUrls: ['./assets-modal.component.scss']
})
export class AssetsModalComponent implements OnInit {
    /**
     * @ignore
     */
    faTimes = faTimes;
    /**
     * @ignore
     */
    faSave = faSave;
    /**
     * The resource data used by the modal
     */
    asset = new Asset();
    /**
     * The resource data id
     */
    id = 0;
    /**
     * True if modal is in edit mode, false otherwise
     */
    edit = false;
    /**
     * An array of questions retrieved by the form mapper for the dynamic form
     */
    questions: QuestionBase<any>[] = [];
    /**
     * The data in the dynamic form
     */
    dynData: any = {};
    /**
     * True if the form must be deleted, false otherwise
     */
    resetForms = false;
    /**
     * True if form actions are blocked, false otherwise
     */
    blocked = false;
    /**
     * Error message to be displayed when something goes wrong
     */
    error = '';
    /**
     * File name of the current resource
     */
    fileName = '';
    /**
     * Instance of a FormMapper used to build the dynamic form questions
     */
    private formMapper: FormMapper;
    /**
     * Instance of a TabMapper used to build the dynamic tab form questions
     */
    private TabMapper: TabsFormMapper;
    tabData: any = {};
    tabs: any[] = [];
    tabTitle = '';

    /**
     *@ignore
     */
    constructor(private mainService: MainService, private ngxSmartModalService: NgxSmartModalService) {}

    /**
     *@ignore
     */
    ngOnInit() {
        this.formMapper = new FormMapper(this.mainService);
        this.TabMapper = new TabsFormMapper(this.mainService);
        this.getQuestions();
        this.getTabs();
        this.getTabTitle();
    }

    /**
     * Get the questions extracted by the form mapper and sets them as a component property
     */
    getQuestions() {
        this.questions = this.formMapper.getFields();
    }

    getTabs() {
        this.tabs = this.TabMapper.getTabs();
    }

    getTabTitle() {
        this.tabTitle = this.TabMapper.getTitle();
    }

    /**
     * Sets the file name
     */
    setFileName() {
        if (this.asset.filename === '' || isNil(this.asset.filename)) {
            this.fileName = 'None';
        } else {
            this.fileName = this.asset.filename;
        }
    }

    /**
     * Sets the dynamic data received from the dynamic form
     * @param event The dynamic data sent by the form component
     */
    setDynData(event) {
        this.dynData = event;
    }

    setTabData(event) {
        this.tabData = event;
    }

    /**
     * Sets the file object in the asset property of the modal
     * @param files The list of files
     */
    setFile(files: FileList) {
        this.asset.resource = files.item(0);
    }

    /**
     * Gets the data set in the modal, if any it sets modal in edit mode and fills the resource data
     */
    dataHandler() {
        if (this.ngxSmartModalService.getModal('assets').hasData()) {
            this.edit = true;
            const data = this.ngxSmartModalService.getModal('assets').getData();
            this.asset = data.asset;
            this.id = data.id;
            this.setFileName();
            this.createQuestions();
        }
    }

    /**
     * Creates the questions filling them with the received edit data
     */
    createQuestions() {
        const fields = this.formMapper.handleForm(this.formMapper.getForms().fields, this.asset);
        const newTabs = this.TabMapper.handleTabs(this.TabMapper.getForms().tabs, this.asset);
        this.formMapper.setFields(fields);
        this.TabMapper.setTabs(newTabs);
        this.questions = fields;
        newTabs[0].active = true;
        this.tabs = newTabs;
    }

    /**
     * Prepares the data for submitting it as a form
     */
    submit() {
        const formData: FormData = new FormData();
        if (this.edit) {
            formData.append('_method', 'PUT');
        }

        for (const key of Object.keys(this.dynData)) {
            this.asset[key] = this.dynData[key];
        }

        for (const key of Object.keys(this.tabData)) {
            this.asset[key] = this.tabData[key];
        }

        for (const key of Object.keys(this.asset)) {
            if (key === 'resource' && isNil(this.asset[key])) {
                continue;
            } else if (isNil(this.asset[key])) {
                this.asset[key] = '';
            }
            formData.append(key, this.asset[key]);
        }
        this.blocked = true;
        this.sendFile(formData);
    }

    /**
     * Sends the file and the linked data as a form and receives the server response
     * @param {FormData} form The form data for submitting
     */
    sendFile(form: FormData) {
        if (!this.edit) {
            this.mainService.postFileForm(form).subscribe(
                suc => {
                    this.mainService.setReload(true);
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
                    this.mainService.setReload(true);
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

    /**
     * Handles the errors given by the server response and changes the error message accordingly
     * @param code The status code given by the server
     * @param details Optional parameter for additional response details (Currently unused)
     */
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

    /**
     * Sets a text error and removes it after three seconds have passed
     * @param {string} text The error text to be displayed
     */
    raiseError(text: string) {
        this.error = text;
        setTimeout(() => {
            this.error = '';
        }, 3000);
    }

    /**
     * Resets the modal and removes all previously set data
     */
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

    /**
     * Calls the modal service and closes this modal
     */
    close() {
        this.ngxSmartModalService.close('assets');
    }
}
