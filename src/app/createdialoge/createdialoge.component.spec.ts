import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedialogeComponent } from './createdialoge.component';

describe('CreatedialogeComponent', () => {
  let component: CreatedialogeComponent;
  let fixture: ComponentFixture<CreatedialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedialogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
