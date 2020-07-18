import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOilItemComponent } from './products-oil-item.component';

describe('ProductsOilItemComponent', () => {
  let component: ProductsOilItemComponent;
  let fixture: ComponentFixture<ProductsOilItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsOilItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOilItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
