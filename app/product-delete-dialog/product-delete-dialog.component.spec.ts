import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteDialogComponent } from './product-delete-dialog.component';

describe('ProductDeleteDialogComponent', () => {
  let component: ProductDeleteDialogComponent;
  let fixture: ComponentFixture<ProductDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
