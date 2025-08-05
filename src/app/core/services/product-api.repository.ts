import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, of } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IProductRepository } from '../../shared/interfaces/product-repository.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductApiRepository implements IProductRepository{

  URL = environment.BACKEND_URL;

  constructor(private readonly http: HttpClient) {}
    createProduct(): Observable<IProduct> {
        throw new Error('Method not implemented.');
    }

  getProducts(): Observable<IProduct[]>{
    return this.http.get<{ data: IProduct[] }>(`${this.URL}/products`).pipe(
        map(response => response.data)
    );
  }
}
