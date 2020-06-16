import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOilComponent } from './categories-oil.component';

describe('CategoriesOilComponent', () => {
  let component: CategoriesOilComponent;
  let fixture: ComponentFixture<CategoriesOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
