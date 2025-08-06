import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductApiRepository } from './product-api.repository';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IProductResponse } from '../../shared/interfaces/product-response.interface';
import { IErrorResponse } from '../../shared/interfaces/error-response.interface';
import { environment } from '../../environments/environment';

describe('ProductApiRepository', () => {
  let service: ProductApiRepository;
  let httpMock: HttpTestingController;
  const baseUrl = environment.BACKEND_URL;

  const mockProduct: IProduct = {
    id: '1',
    name: 'Test',
    description: 'Desc',
    logo: 'http:.//example-image.com',
    date_release: new Date(),
    date_revision: new Date()
  };

  const mockResponse: IProductResponse = {
    message: 'OK',
    product: mockProduct
  };

  const mockError: IErrorResponse = {
    name: 'HttpError',
    message: 'Something went wrong'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),         
        provideHttpClientTesting(),
        ProductApiRepository
      ]
    });

    service  = TestBed.inject(ProductApiRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST createProduct and return IProductResponse', () => {
    service.createProduct(mockProduct).subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

  it('should catch error in createProduct and return IErrorResponse', () => {
    service.createProduct(mockProduct).subscribe(resp => {
      expect(resp).toEqual(mockError);
    });

    const req = httpMock.expectOne(`${baseUrl}/products`);
    // simulamos un error con cuerpo mockError
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });

  it('should PUT updateProduct and return IProductResponse', () => {
    service.updateProduct('1', mockProduct).subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/products/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

  it('should catch error in updateProduct and return IErrorResponse', () => {
    service.updateProduct('1', mockProduct).subscribe(resp => {
      expect(resp).toEqual(mockError);
    });

    const req = httpMock.expectOne(`${baseUrl}/products/1`);
    req.flush(mockError, { status: 400, statusText: 'Bad Request' });
  });

  it('should GET getProducts and map data array', () => {
    const payload = { data: [mockProduct] };
    service.getProducts().subscribe(prods => {
      expect(prods).toEqual([mockProduct]);
    });

    const req = httpMock.expectOne(`${baseUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(payload);
  });

  it('should DELETE deleteProduct and return IProductResponse', () => {
    service.deleteProduct('1').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should catch error in deleteProduct and return IErrorResponse', () => {
    service.deleteProduct('1').subscribe(resp => {
      expect(resp).toEqual(mockError);
    });

    const req = httpMock.expectOne(`${baseUrl}/products/1`);
    req.flush(mockError, { status: 404, statusText: 'Not Found' });
  });

  it('should GET checkProductId and return boolean', () => {
    service.checkProductId('abc').subscribe(flag => {
      expect(flag).toBeTrue();
    });

    const req = httpMock.expectOne(`${baseUrl}/products/verification/abc`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });
});
