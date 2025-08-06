import { ChangeDetectionStrategy, Component, Inject, model, OnInit, signal } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { FormsModule } from '@angular/forms';
import { FilterProductComponent } from "../../components/filter-product/filter-product.component";
import { PaginateProductComponent } from '../../components/paginate-product/paginate-product.component';
import { ItemsProductComponent } from "../../components/items-product/items-product.component";
import { ProductUtilsService } from '../../../../core/services/product-utils.service';
import { IProductRepository, PRODUCT_REPOSITORY } from '../../../../shared/interfaces/product-repository.interface';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, FilterProductComponent, PaginateProductComponent, ItemsProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit{
  itemsPerPageOptions = [5, 10, 20]
  numberOfItemsPage = signal<number>(5);
  selectedPage = signal<number>(1);
  currentSearch = model<string>("");
  totalPages= signal<number>(0);
  
  products = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  productsPage = signal<IProduct[]>([]);

  loading = signal<boolean>(true);

  constructor( 
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    private readonly productUtils: ProductUtilsService,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productRepository.getProducts().subscribe(products => {
      this.products.set(products);
      this.updatePagination();
    });
  }

  async updatePagination(): Promise<void> {
    this.loading.set(true);
    
    const result = await this.productUtils.filterAndPaginate(
      this.products(),
      this.currentSearch(),
      this.selectedPage(),
      this.numberOfItemsPage()
    );
  
    this.filteredProducts.set(result.filtered);
    this.productsPage.set(result.paginated);
    this.totalPages.set(result.totalPages);

    this.loading.set(false);
  }

  handleChangePage(page: number): void {
    this.selectedPage.set(page);
    this.updatePagination();
  }

  onItemsPerPageChange(newSize: number) {
    this.numberOfItemsPage.set(newSize);
    this.updatePagination();
  }

  onCurrenSearchChange(search: string){
    this.currentSearch.set(search);
    this.updatePagination();
  }

  goToCreateProduct(){
    const baseRoute = ROUTE_PATHS.productCreate;
    this.router.navigate([baseRoute]);
  }
 }
