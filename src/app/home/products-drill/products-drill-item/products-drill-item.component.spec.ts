import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDrillItemComponent } from './products-drill-item.component';

describe('ProductsDrillItemComponent', () => {
  let component: ProductsDrillItemComponent;
  let fixture: ComponentFixture<ProductsDrillItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDrillItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDrillItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
