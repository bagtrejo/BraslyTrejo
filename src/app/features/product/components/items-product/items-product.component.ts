import { Component, input } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { DefaultImageDirective } from '../../../../core/directives/default-image.directive';
import { SpinnerComponent } from '../../../../layout/spinner/spinner.component';

@Component({
  selector: 'app-items-product',
  imports: [DefaultImageDirective, SpinnerComponent],
  templateUrl: './items-product.component.html',
  styleUrl: './items-product.component.scss'
})
export class ItemsProductComponent {
  products = input<IProduct[]>();
  isLoading = input<boolean>(true);
}
