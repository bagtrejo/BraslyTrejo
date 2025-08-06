import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContentProductComponent } from './form-content-product.component';

describe('FormContentProductComponent', () => {
  let component: FormContentProductComponent;
  let fixture: ComponentFixture<FormContentProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContentProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContentProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
