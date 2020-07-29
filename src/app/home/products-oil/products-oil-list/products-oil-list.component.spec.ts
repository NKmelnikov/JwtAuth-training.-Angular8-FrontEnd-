import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOilListComponent } from './products-oil-list.component';

describe('ProductsOilListComponent', () => {
  let component: ProductsOilListComponent;
  let fixture: ComponentFixture<ProductsOilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsOilListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
