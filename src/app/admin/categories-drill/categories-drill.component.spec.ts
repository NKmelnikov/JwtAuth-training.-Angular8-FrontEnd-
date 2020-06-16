import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDrillComponent } from './categories-drill.component';

describe('CategoriesDrillComponent', () => {
  let component: CategoriesDrillComponent;
  let fixture: ComponentFixture<CategoriesDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
