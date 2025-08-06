// product-list.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { IProductRepository, PRODUCT_REPOSITORY } from '../../../../shared/interfaces/product-repository.interface';
import { ProductUtilsService } from '../../../../core/services/product-utils.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let repoSpy: jasmine.SpyObj<IProductRepository>;
  let utilsSpy: jasmine.SpyObj<ProductUtilsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProducts: IProduct[] = [
    { id: '1', name: 'A', description: '', releaseDate: new Date(), restructureDate: new Date() } as any,
    { id: '2', name: 'B', description: '', releaseDate: new Date(), restructureDate: new Date() } as any,
  ];

  const mockResult = {
    filtered: mockProducts,
    paginated: [mockProducts[0]],
    totalPages: 2
  };

  beforeEach(async () => {
    // Creamos espías para el repositorio, el servicio utilitario y el router
    repoSpy   = jasmine.createSpyObj('IProductRepository', ['getProducts']);
    utilsSpy  = jasmine.createSpyObj('ProductUtilsService', ['filterAndPaginate']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configuramos devoluciones controladas
    repoSpy.getProducts.and.returnValue(of(mockProducts));
    utilsSpy.filterAndPaginate.and.returnValue(Promise.resolve(mockResult));

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: PRODUCT_REPOSITORY, useValue: repoSpy },
        { provide: ProductUtilsService, useValue: utilsSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignora los child components no declarados
    }).compileComponents();

    fixture   = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and update pagination on init', fakeAsync(() => {
    fixture.detectChanges();
    expect(repoSpy.getProducts).toHaveBeenCalled();
    // antes de resolver, loading está en true
    expect(component.loading()).toBeTrue();

    // resuelve el Promise de filterAndPaginate
    tick();                  
    fixture.detectChanges();

    // Verificamos llamada con los valores por defecto
    expect(utilsSpy.filterAndPaginate).toHaveBeenCalledWith(
      mockProducts,       // this.products()
      '',                 // this.currentSearch()
      1,                  // this.selectedPage()
      5                   // this.numberOfItemsPage()
    );

    // Señales actualizadas
    expect(component.products()).toEqual(mockProducts);
    expect(component.filteredProducts()).toEqual(mockResult.filtered);
    expect(component.productsPage()).toEqual(mockResult.paginated);
    expect(component.totalPages()).toBe(mockResult.totalPages);
    expect(component.loading()).toBeFalse();
  }));

  it('should change page and update pagination', fakeAsync(() => {
    fixture.detectChanges();
    tick(); fixture.detectChanges();

    utilsSpy.filterAndPaginate.calls.reset();
    component.handleChangePage(2);
    expect(component.selectedPage()).toBe(2);

    tick(); fixture.detectChanges();
    expect(utilsSpy.filterAndPaginate).toHaveBeenCalledWith(
      mockProducts, '', 2, 5
    );
  }));

  it('should change items per page and update pagination', fakeAsync(() => {
    fixture.detectChanges();
    tick(); fixture.detectChanges();

    utilsSpy.filterAndPaginate.calls.reset();
    component.onItemsPerPageChange(10);
    expect(component.numberOfItemsPage()).toBe(10);

    tick(); fixture.detectChanges();
    expect(utilsSpy.filterAndPaginate).toHaveBeenCalledWith(
      mockProducts, '', 1, 10
    );
  }));

  it('should change search and update pagination', fakeAsync(() => {
    fixture.detectChanges();
    tick(); fixture.detectChanges();

    utilsSpy.filterAndPaginate.calls.reset();
    component.onCurrenSearchChange('test');
    expect(component.currentSearch()).toBe('test');

    tick(); fixture.detectChanges();
    expect(utilsSpy.filterAndPaginate).toHaveBeenCalledWith(
      mockProducts, 'test', 1, 5
    );
  }));

  it('should navigate to create product', () => {
    component.goToCreateProduct();
    expect(routerSpy.navigate).toHaveBeenCalledWith([ROUTE_PATHS.productCreate]);
  });
});
