import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesGComponent } from './operaciones-g.component';

describe('OperacionesGComponent', () => {
  let component: OperacionesGComponent;
  let fixture: ComponentFixture<OperacionesGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionesGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
