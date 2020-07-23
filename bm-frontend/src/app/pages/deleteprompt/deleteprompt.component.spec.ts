import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepromptComponent } from './deleteprompt.component';

describe('DeletepromptComponent', () => {
  let component: DeletepromptComponent;
  let fixture: ComponentFixture<DeletepromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
