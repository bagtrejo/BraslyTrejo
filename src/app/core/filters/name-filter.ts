import { IProduct } from "../../shared/interfaces/product.interface";
import { unaccentFormat } from "../../shared/utils/unaccent-format-words";
import { IProductFilter } from "./product-filter.interface";

export class NameFilter implements IProductFilter {
    apply(products: IProduct[], search: string): IProduct[] {
      const term = search.toLowerCase().trim();
      return products.filter(p =>
        unaccentFormat(p.name || '').includes(term)
      );
    }
  }
  