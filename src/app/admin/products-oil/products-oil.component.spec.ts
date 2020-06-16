import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOilComponent } from './products-oil.component';

describe('ProductsOilComponent', () => {
  let component: ProductsOilComponent;
  let fixture: ComponentFixture<ProductsOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
