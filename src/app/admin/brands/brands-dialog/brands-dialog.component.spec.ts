import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDialogComponent } from './brands-dialog.component';

describe('BrandsDialogComponent', () => {
  let component: BrandsDialogComponent;
  let fixture: ComponentFixture<BrandsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
