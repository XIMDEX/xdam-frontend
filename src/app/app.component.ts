import { Component, ChangeDetectorRef } from '@angular/core';
/**
 * @class
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poly-dam';
  isOpen = false;

  constructor(private cdRef: ChangeDetectorRef ) {}
  public toggleOpen() {
    this.isOpen = !this.isOpen;
    this.cdRef.detectChanges();
  }

  handleSelect(event) {
    if (event !== null) {
    }
  }
}
