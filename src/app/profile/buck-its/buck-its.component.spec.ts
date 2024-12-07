import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuckItsComponent } from './buck-its.component';

describe('BuckItsComponent', () => {
  let component: BuckItsComponent;
  let fixture: ComponentFixture<BuckItsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuckItsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuckItsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
