import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IProductRepository } from '../../shared/interfaces/product-repository.interface';
import { IErrorResponse } from '../../shared/interfaces/error-response.interface';
import { IProductResponse } from '../../shared/interfaces/product-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductApiRepository implements IProductRepository {

  private readonly URL = environment.BACKEND_URL;

  constructor(private readonly http: HttpClient) {}

  createProduct(product: IProduct): Observable<IProductResponse | IErrorResponse> {
    return this.http.post<IProductResponse>(`${this.URL}/products`, product).pipe(
      map(response => response),
      catchError((err: HttpErrorResponse) => {
        const body = err.error as Partial<IErrorResponse> | undefined;
        const errorResp: IErrorResponse = {
          name: body?.name ?? err.name,
          message: body?.message ?? err.message
        };
        return of(errorResp);
      })
    );
  }

  updateProduct(id: string, product: IProduct): Observable<IProductResponse | IErrorResponse> {
    return this.http.put<IProductResponse>(`${this.URL}/products/${id}`, product).pipe(
      map(response => response),
      catchError((err: HttpErrorResponse) => {
        const body = err.error as Partial<IErrorResponse> | undefined;
        const errorResp: IErrorResponse = {
          name: body?.name ?? err.name,
          message: body?.message ?? err.message
        };
        return of(errorResp);
      })
    );
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<{ data: IProduct[] }>(`${this.URL}/products`).pipe(
      map(response => response.data)
    );
  }

  deleteProduct(id: string): Observable<IProductResponse | IErrorResponse> {
    return this.http.delete<IProductResponse>(`${this.URL}/products/${id}`).pipe(
      map(response => response),
      catchError((err: HttpErrorResponse) => {
        const body = err.error as Partial<IErrorResponse> | undefined;
        const errorResp: IErrorResponse = {
          name: body?.name ?? err.name,
          message: body?.message ?? err.message
        };
        return of(errorResp);
      })
    );
  }

  checkProductId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/products/verification/${id}`).pipe(
      map(response => response)
    );
  }
}

