import { Item } from '../../models/Item';
import { ListOptions } from '../../models/interfaces/ListOptions.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'xdam-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    /**
     * The items received by the DAM component
     */
    @Input() items: Item[];

    @Input() settings: ListOptions;

    constructor() {}

    ngOnInit() {}
}
