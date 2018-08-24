import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dyn-field',
  templateUrl: './dyn-field.component.html',
  styleUrls: ['./dyn-field.component.css']
})
export class DynFieldComponent implements OnInit {

  @Input()
  field: Object;

  constructor() { }

  ngOnInit() {
  }

}
