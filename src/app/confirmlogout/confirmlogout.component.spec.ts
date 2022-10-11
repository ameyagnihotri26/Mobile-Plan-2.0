import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmlogoutComponent } from './confirmlogout.component';

describe('ConfirmlogoutComponent', () => {
  let component: ConfirmlogoutComponent;
  let fixture: ComponentFixture<ConfirmlogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmlogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
