import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})
export class FacetComponent implements OnInit {

  @Input() facet = {key: '', label: '', values: {}};
  @Input() selected = [];
  @Input() hidden = false;
  @Output() selectedValue = new EventEmitter<string>();
  valuesArray = [];
  faPlus = faPlus;
  faMinus = faMinus;

  constructor() {}

  ngOnInit() {}

  toggleFacet(event, option) {
    if(event.target.checked) {
      if(!this.valuesArray.includes(option.key)) {
        this.valuesArray.push(option.key);
      }
    } else {
      let index = this.valuesArray.indexOf(option.key);
      if(index !== -1) {
        this.valuesArray.splice(index, 1);
      }
    }
    this.stringifyQuery();
  }

  togglePanel() {
    this.hidden = !this.hidden;
  }

  stringifyQuery() {
    this.selectedValue.emit(this.valuesArray.join(','));
  }

  isActive(facet: Object) {
    const active = this.selected.indexOf(facet.key) >= 0;
    return active;
  }

}
