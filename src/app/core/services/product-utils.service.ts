import { Injectable } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IProductFilter } from '../filters/product-filter.interface';
import { NameFilter } from '../filters/name-filter';

@Injectable({
  providedIn: 'root'
})
export class ProductUtilsService {
  constructor() { }

  private filter: IProductFilter = new NameFilter();

  filterProducts(products: IProduct[], search: string){
    const searchValue = search.toLowerCase().trim();
    return  this.filter.apply(products, searchValue)
  }

  paginateProducts(items: IProduct[], page: number, itemsPerPage: number): IProduct[] {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }

  getTotalPages(filteredProducts: IProduct[], itemsPerPage: number): number {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }

  filterAndPaginate(
    products: IProduct[], 
    search: string, 
    page: number, 
    itemsPerPage: number, 
    delayMs: number = 500
  ): Promise<{
      filtered: IProduct[],
      paginated: IProduct[],
      totalPages: number
    }>{

    return new Promise(resolve => {
      setTimeout(() => {
        const filtered = this.filterProducts(products, search);
        const totalPages = this.getTotalPages(filtered, itemsPerPage);
        const paginated = this.paginateProducts(filtered, page, itemsPerPage);
  
        resolve({ filtered, paginated, totalPages });
      }, delayMs)});
  }

}
