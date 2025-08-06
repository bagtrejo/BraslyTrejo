import { IProduct } from "./product.interface";

export interface IProductResponse{
    message: string;
    product: IProduct;
}