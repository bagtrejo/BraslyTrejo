import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionsProductComponent } from './form-actions-product.component';

describe('FormActionsProductComponent', () => {
  let component: FormActionsProductComponent;
  let fixture: ComponentFixture<FormActionsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActionsProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActionsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
