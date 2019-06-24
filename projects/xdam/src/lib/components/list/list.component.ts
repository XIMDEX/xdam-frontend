import { Item } from '../../models/Item';
import { ListOptions } from '../../models/interfaces/ListOptions.interface';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'xdam-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    /**
     * The items received by the DAM component
     */
    @Input() items: Item[];
    @Input() settings: ListOptions;

    @Output() delete = new EventEmitter<Item>();
    @Output() download = new EventEmitter<Item>();

    constructor() {}

    deleteItem(item: Item) {
        this.delete.emit(item);
    }

    downloadItem(item: Item) {
        this.download.emit(item);
    }
}
