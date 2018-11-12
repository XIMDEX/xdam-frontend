/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnChanges
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'dam-tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [
    `
    :host {
      width: 100%;
    }
    .tab-close {
      color: gray;
      text-align: right;
      cursor: pointer;
    }
    .nav-tabs {
      border-bottom: 1px solid #ddd;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: left;
    }
    .nav {
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
    }
    .nav-tabs > li {
      margin-bottom: -1px;
    }
    .nav > li {
      display: block;
    }
    .nav-tabs > li.active > a {
      color: #fff;
      cursor: default;
      background-color: #00a397;
      border: 1px solid #ddd;
      border-bottom-color: rgb(221, 221, 221);
      border-bottom-color: transparent;
    }
    .nav-tabs > li > a {
      margin-right: 2px;
      line-height: 1.42857143;
      border: 1px solid transparent;
      border-radius: 4px 4px 0 0;
      color: #666;
    }
    .nav > li > a {
      position: relative;
      display: block;
      padding: 10px 15px;
      text-decoration: none;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: TabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
