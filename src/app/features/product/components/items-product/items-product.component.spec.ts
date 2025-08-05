import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsProductComponent } from './items-product.component';

describe('ItemsProductComponent', () => {
  let component: ItemsProductComponent;
  let fixture: ComponentFixture<ItemsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
