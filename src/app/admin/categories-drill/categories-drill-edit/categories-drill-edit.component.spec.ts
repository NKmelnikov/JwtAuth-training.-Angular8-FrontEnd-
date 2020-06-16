import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDrillEditComponent } from './categories-drill-edit.component';

describe('CategoriesDrillEditComponent', () => {
  let component: CategoriesDrillEditComponent;
  let fixture: ComponentFixture<CategoriesDrillEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesDrillEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDrillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
