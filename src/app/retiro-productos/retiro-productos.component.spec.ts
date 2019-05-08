import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroProductosComponent } from './retiro-productos.component';

describe('RetiroProductosComponent', () => {
  let component: RetiroProductosComponent;
  let fixture: ComponentFixture<RetiroProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiroProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
