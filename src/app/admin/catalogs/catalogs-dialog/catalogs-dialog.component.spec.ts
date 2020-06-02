import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsDialogComponent } from './catalogs-dialog.component';

describe('CatalogsDialogComponent', () => {
  let component: CatalogsDialogComponent;
  let fixture: ComponentFixture<CatalogsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
