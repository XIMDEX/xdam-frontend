import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../../services/main.service';
import { hasIn } from 'ramda';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.css']
})
export class FacetsComponent implements OnInit, OnChanges {

  @Input() facets = [];
  selectedFacets = [];
  facetsQuery: Object = {};
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  isOpen = false;
  facetsConfig = null;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.facetsConfig = this.mainService.getComponentConfigs('facets');
    this.buildQuery();
  }

  ngOnChanges(changes) {
    this.setSelectedFacets();
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  buildQuery() {
    this.facets.map((facet) => {
      this.facetsQuery[facet.key] = '';
    });
  }

  updateFacetsQuery(evt, key) {
    this.facetsQuery[key] = evt;
    this.mainService.setActiveFacets(this.facetsQuery);
  }

  setSelectedFacets() {
    this.selectedFacets = [];
    for (const index in this.facets) {
      const values = this.facets[index].values;
      const key = this.facets[index].key;
      for (const option in values) {
        if (hasIn(key, this.facetsQuery) && this.facetsQuery[key].indexOf(option) !== -1) {
          this.selectedFacets.push(option);
        }
      }
    }
  }
}
