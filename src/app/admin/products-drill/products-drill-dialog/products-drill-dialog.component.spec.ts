import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDrillDialogComponent } from './products-drill-dialog.component';

describe('ProductsDrillDialogComponent', () => {
  let component: ProductsDrillDialogComponent;
  let fixture: ComponentFixture<ProductsDrillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDrillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDrillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
