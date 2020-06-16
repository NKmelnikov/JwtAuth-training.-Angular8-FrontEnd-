import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOilEditComponent } from './categories-oil-edit.component';

describe('CategoriesOilEditComponent', () => {
  let component: CategoriesOilEditComponent;
  let fixture: ComponentFixture<CategoriesOilEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesOilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesOilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
