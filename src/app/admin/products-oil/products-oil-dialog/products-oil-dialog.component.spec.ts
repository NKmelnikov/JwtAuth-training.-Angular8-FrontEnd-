import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOilDialogComponent } from './products-oil-dialog.component';

describe('ProductsOilDialogComponent', () => {
  let component: ProductsOilDialogComponent;
  let fixture: ComponentFixture<ProductsOilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsOilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
