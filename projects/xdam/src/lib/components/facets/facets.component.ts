import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'xdam-facets',
    templateUrl: './facets.component.html',
    styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    get openIncon() {
        return faChevronRight;
    }
}
