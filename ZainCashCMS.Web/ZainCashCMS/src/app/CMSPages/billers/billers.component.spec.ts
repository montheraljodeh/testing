import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillersComponent } from './billers.component';

describe('BillersComponent', () => {
  let component: BillersComponent;
  let fixture: ComponentFixture<BillersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillersComponent]
    });
    fixture = TestBed.createComponent(BillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
