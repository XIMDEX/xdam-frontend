import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'poly-dam';
    isOpen = false;

    constructor(private cdRef: ChangeDetectorRef) {}

    toggleOpen() {
        this.isOpen = !this.isOpen;
        this.cdRef.detectChanges();
    }

    handleSelect(event) {
        console.log(event);
    }
}
