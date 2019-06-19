import { Component, Input } from '@angular/core';
import { sprintf } from 'sprintf-js';

import { ListItemOption, ListItemActions } from '../../../models/interfaces/ListOptions.interface';
import { Item } from '../../../models/Item';
import { hasIn } from 'ramda';
import { faDownload, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'xdam-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    faDownload = faDownload;
    faEdit = faEdit;
    faTrash = faTrash;

    @Input() item: Item;
    @Input() settings: ListItemOption;

    constructor() {}

    get type(): string {
        return sprintf(this.settings.type, this.item.type).toUpperCase();
    }

    get title(): string {
        return sprintf(this.settings.title, this.item.title);
    }

    set img(url: string) {
        this.item.image = url;
    }

    get img(): string {
        return this.item.image;
    }

    get actions(): ListItemActions | null {
        return this.settings.actions;
    }

    imgError() {
        let image = null;
        if (hasIn(this.item.type.toLowerCase(), this.settings.placeholder)) {
            image = this.settings.placeholder[this.item.type.toLowerCase()];
        } else if (hasIn('default', this.settings.placeholder)) {
            image = this.settings.placeholder['default'];
        }

        this.img = image;
    }
}
