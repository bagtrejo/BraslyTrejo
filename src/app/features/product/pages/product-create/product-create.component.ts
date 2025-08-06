import { ChangeDetectionStrategy, Component, Inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductRepository, PRODUCT_REPOSITORY } from '../../../../shared/interfaces/product-repository.interface';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { FormContentProductComponent } from "../../components/form-content-product/form-content-product.component";
import { ROUTE_PATHS } from '../../../../core/constants/route-paths';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, FormContentProductComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateComponent{
  productId = signal<string | undefined>(undefined);
  productData = signal<IProduct | undefined>(undefined)


  constructor(
    private activedRoute: ActivatedRoute, 
    @Inject(PRODUCT_REPOSITORY) public productRepo: IProductRepository,
    private router: Router
  ){
    const navigation = this.router.getCurrentNavigation();
    this.productData.set(navigation?.extras.state?.['product']);
    this.productId.set(this.productData()?.id)
  }

  handleSave(data: any){
    this.productRepo.createProduct(data as IProduct).subscribe(response => {
      alert(response.message);
      this.router.navigate([ROUTE_PATHS.productList]);
    });
  }

  handleUpdate(data: any){
    this.productRepo.updateProduct(this.productId()!, data as IProduct).subscribe(response => {
      alert(response.message);
      this.router.navigate([ROUTE_PATHS.productList]);
    });
  }
 
 }
