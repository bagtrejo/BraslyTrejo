// product-create.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductCreateComponent } from './product-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormContentProductComponent } from '../../components/form-content-product/form-content-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PRODUCT_REPOSITORY, IProductRepository } from '../../../../shared/interfaces/product-repository.interface';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths';
import { IProductResponse } from '../../../../shared/interfaces/product-response.interface';

describe('ProductCreateComponent', () => {
  let component: ProductCreateComponent;
  let fixture: ComponentFixture<ProductCreateComponent>;
  let repoSpy: jasmine.SpyObj<IProductRepository>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduct = {
    id: 'p1',
    name: 'Test',
    description: 'Desc',
    releaseDate: new Date(2022, 0, 1),
    restructureDate: new Date(2023, 0, 1)
  } as any;

  beforeEach(async () => {
    repoSpy = jasmine.createSpyObj('IProductRepository', ['createProduct','updateProduct']);

    const successResp: IProductResponse = {
        message: 'Created!',
        product: mockProduct
    };
    const updateResp: IProductResponse = {
        message: 'Updated!',
        product: mockProduct
    };

    repoSpy.createProduct.and.returnValue(of(successResp));
    repoSpy.updateProduct.and.returnValue(of(updateResp));

    // Espia para el router
    routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation','navigate']);
    routerSpy.getCurrentNavigation.and.returnValue({
      extras: { state: { product: mockProduct } }
    } as any);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormContentProductComponent,
        ProductCreateComponent 
      ],
      providers: [
        { provide: PRODUCT_REPOSITORY, useValue: repoSpy },
        { provide: Router,             useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create and initialize productData & productId from navigation state', () => {
    // En el constructor se lee getCurrentNavigation()
    expect(component.productData()).toEqual(mockProduct);
    expect(component.productId()).toBe(mockProduct.id);
  });

  it('should call createProduct, alert, and navigate on handleSave', fakeAsync(() => {
    spyOn(window, 'alert');
    component.handleSave(mockProduct);
    tick();
    expect(repoSpy.createProduct).toHaveBeenCalledWith(mockProduct);
    expect(window.alert).toHaveBeenCalledWith('Created!');
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTE_PATHS.productList]);
  }));

  it('should call updateProduct, alert, and navigate on handleUpdate', fakeAsync(() => {
    spyOn(window, 'alert');
    component.handleUpdate(mockProduct);
    tick();
    expect(repoSpy.updateProduct).toHaveBeenCalledWith(mockProduct.id, mockProduct);
    expect(window.alert).toHaveBeenCalledWith('Updated!');
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTE_PATHS.productList]);
  }));
});
