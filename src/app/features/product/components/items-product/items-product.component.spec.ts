import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsProductComponent } from './items-product.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PRODUCT_REPOSITORY } from '../../../../shared/interfaces/product-repository.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths';

describe('ItemsProductComponent', () => {
  let component: ItemsProductComponent;
  let fixture: ComponentFixture<ItemsProductComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let repoSpy: jasmine.SpyObj<{ deleteProduct: jasmine.Spy }>;

  beforeEach(async () => {
    // Creamos espías para Router y ProductRepository
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    repoSpy = jasmine.createSpyObj('IProductRepository', ['deleteProduct']);
    repoSpy.deleteProduct.and.returnValue(of('Producto eliminado'));

    await TestBed.configureTestingModule({
      imports: [ItemsProductComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PRODUCT_REPOSITORY, useValue: repoSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsProductComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit page on edit action', () => {
    const product: IProduct = { id: '1', name: 'Test', description: '', releaseDate: new Date(), restructureDate: new Date() } as any;
    const event = { action: 'edit', row: () => product };
    component.handleActionSelected(event);
    expect(routerSpy.navigate).toHaveBeenCalledWith(
      [ROUTE_PATHS.productEdit],
      { state: { product } }
    );
  });

  it('should set showConfirm and productIdToDelete on delete action', () => {
    const event = { action: 'delete', row: () => ({ id: 'abc' } as IProduct) };

    // Valores iniciales
    expect(component.showConfirm()).toBeFalse();
    expect(component.productIdToDelete()).toBeUndefined();

    component.handleActionSelected(event);

    expect(component.showConfirm()).toBeTrue();
    expect(component.productIdToDelete()).toBe('abc');
  });

  it('should close confirm and do nothing if handleDelete(false)', () => {
    component.showConfirm.set(true);
    component.productIdToDelete.set('abc');
    spyOn(component.loadProducts, 'emit');

    component.handleDelete(false);

    expect(component.showConfirm()).toBeFalse();
    expect(repoSpy.deleteProduct).not.toHaveBeenCalled();
    expect(component.loadProducts.emit).not.toHaveBeenCalled();
  });

  it('should delete product, alert and emit loadProducts on handleDelete(true)', () => {
    component.productIdToDelete.set('xyz');
    component.showConfirm.set(true);
    spyOn(window, 'alert');
    spyOn(component.loadProducts, 'emit');

    component.handleDelete(true);

    expect(component.showConfirm()).toBeFalse();
    expect(repoSpy.deleteProduct).toHaveBeenCalledWith('xyz');
    expect(window.alert).toHaveBeenCalledWith('Producto eliminado');
    expect(component.loadProducts.emit).toHaveBeenCalled();
  });
});
