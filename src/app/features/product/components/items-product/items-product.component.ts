import { Component, Inject, input, output, signal } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { DefaultImageDirective } from '../../../../core/directives/default-image.directive';
import { SpinnerComponent } from '../../../../layout/spinner/spinner.component';
import { DropdownComponent } from "../../../../layout/dropdown/dropdown.component";
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths';
import { ConfirmDialogComponent } from '../../../../layout/confirm-dialog/confirm-dialog.component';
import { IProductRepository, PRODUCT_REPOSITORY } from '../../../../shared/interfaces/product-repository.interface';

@Component({
  selector: 'app-items-product',
  imports: [DefaultImageDirective, SpinnerComponent, DropdownComponent, ConfirmDialogComponent],
  templateUrl: './items-product.component.html',
  styleUrl: './items-product.component.scss'
})
export class ItemsProductComponent {
  products = input<IProduct[]>();
  isLoading = input<boolean>(true);
  showConfirm = signal<boolean>(false);
  productIdToDelete = signal<string | undefined>(undefined);
  loadProducts = output<void>();

  actions = signal<{label: string, value: string}[]>([
    {
      label: 'Editar',
      value: 'edit'
    },
    {
      label: 'Eliminar',
      value: 'delete'
    }
  ]);

  constructor(private router: Router, @Inject(PRODUCT_REPOSITORY) private productRepository: IProductRepository) {}

  handleActionSelected(event: { action: string; row: any }) {
    if (event.action === 'edit') {
      this.goToEditProduct(event.row())
    } else if (event.action === 'delete') {
      this.confirmDeleteProduct(event.row().id)
    }
  }

  confirmDeleteProduct(id: string){
    this.showConfirm.set(true);
    this.productIdToDelete.set(id);
  }

  goToEditProduct(product: IProduct){
    const route = ROUTE_PATHS.productEdit
    this.router.navigate([route], {state: {'product': product }})
  } 

  handleDelete(result: boolean){
    this.showConfirm.set(false);
    if(result && this.productIdToDelete()){
      this.productRepository.deleteProduct(this.productIdToDelete()!).subscribe(response => {
        alert(response);
        this.loadProducts.emit()
      })
    }
  }
}
