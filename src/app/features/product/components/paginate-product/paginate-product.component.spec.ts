import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateProductComponent } from './paginate-product.component';

describe('PaginateProductComponent', () => {
  let component: PaginateProductComponent;
  let fixture: ComponentFixture<PaginateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginateProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
