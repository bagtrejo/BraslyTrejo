import { IProduct } from '../../shared/interfaces/product.interface';

export interface IProductFilter {
  apply(products: IProduct[], search: string): IProduct[];
}