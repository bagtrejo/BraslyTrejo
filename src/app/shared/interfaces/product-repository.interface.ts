import { Observable } from "rxjs";
import { IProduct } from "./product.interface";
import { InjectionToken } from "@angular/core";

export interface IProductRepository {
    getProducts(): Observable<IProduct[]>;
    createProduct(): Observable<IProduct>;
}

export const PRODUCT_REPOSITORY = new InjectionToken<IProductRepository>('ProductRepository');