import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynFormComponent } from './dyn-form.component';

describe('DynFormComponent', () => {
  let component: DynFormComponent;
  let fixture: ComponentFixture<DynFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
