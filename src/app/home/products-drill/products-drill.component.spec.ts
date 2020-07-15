import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDrillComponent } from './products-drill.component';

describe('ProductsDrillComponent', () => {
  let component: ProductsDrillComponent;
  let fixture: ComponentFixture<ProductsDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
