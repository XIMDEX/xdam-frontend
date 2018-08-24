import { Component, OnInit } from '@angular/core';
import { Form } from '../../../../models/Form';
import { DynFieldComponent } from './dyn-field/dyn-field.component';

@Component({
  selector: 'app-dyn-form',
  templateUrl: './dyn-form.component.html',
  styleUrls: ['./dyn-form.component.css']
})
export class DynFormComponent implements OnInit {

  form: Form;

  constructor() { }

  ngOnInit() {
  }

}
