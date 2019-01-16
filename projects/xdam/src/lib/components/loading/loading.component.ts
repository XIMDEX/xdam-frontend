import { Component, OnInit, Input } from '@angular/core';

/**
 * Component that renders a loading screen when requested
 */
@Component({
    selector: 'dam-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    /** True if loading component should render, False otherwise */
    @Input() show: boolean = false;

    /**@ignore */
    constructor() { }

    /**@ignore */
    ngOnInit() {
    }

}