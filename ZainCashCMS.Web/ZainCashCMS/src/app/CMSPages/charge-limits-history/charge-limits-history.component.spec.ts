import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeLimitsHistoryComponent } from './charge-limits-history.component';

describe('ChargeLimitsHistoryComponent', () => {
  let component: ChargeLimitsHistoryComponent;
  let fixture: ComponentFixture<ChargeLimitsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeLimitsHistoryComponent]
    });
    fixture = TestBed.createComponent(ChargeLimitsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
