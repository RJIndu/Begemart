import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableproductsComponent } from './tableproducts.component';

describe('TableproductsComponent', () => {
  let component: TableproductsComponent;
  let fixture: ComponentFixture<TableproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
