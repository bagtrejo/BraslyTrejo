import { Observable } from "rxjs";
import { IProduct } from "./product.interface";
import { InjectionToken } from "@angular/core";
import { IProductResponse } from "./product-response.interface";
import { IErrorResponse } from "./error-response.interface";

export interface IProductRepository {
    getProducts(): Observable<IProduct[]>;
    createProduct(product: IProduct): Observable<IProductResponse | IErrorResponse>;
    updateProduct(id:string, product: IProduct): Observable<IProductResponse | IErrorResponse>;
    deleteProduct(id:string): Observable<IProductResponse | IErrorResponse>;
    checkProductId(productId: string):Observable<boolean>;
}

export const PRODUCT_REPOSITORY = new InjectionToken<IProductRepository>('ProductRepository');