import { Component, input, output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginate-product',
  imports: [FormsModule],
  template: `
    <div class="pagination">
          <span class="pagination__results">{{ filteredProducts().length}} Resultados</span>
         
          <div class="pagination__buttons">
            @for(page of [].constructor(totalPages()); track $index){
                <button class="pagination__button" [class.pagination__button--active]="$index + 1 === this.selectedPage()" type="button" (click)="changePage($index + 1)">{{ $index + 1 }}</button>
            }
          </div>
          
          <select class="pagination__select" name="paginate" id="paginate" [(ngModel)]="localItemsPerPage" (ngModelChange)="changeItemsPerPage()">
              @for (item of itemsPerPageOptions(); track $index) {
                  <option [value]="item">{{ item }}</option>
              }
          </select>
      </div>
  `,
  styleUrl: './paginate-product.component.scss'
})
export class PaginateProductComponent {
  filteredProducts = input<IProduct[]>([]);
  totalPages= input<number>(0);
  selectedPage = input<number>(1);
  itemsPerPageOptions = input<number[]>([1, 2, 3])
  itemsPerPage = input<number>(1);

  pageChange = output<number>();
  itemsPerPageChange = output<number>();

  localItemsPerPage = 1; // mutable para ngModel

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemsPerPage']) {
      this.localItemsPerPage = this.itemsPerPage();
    }
  }

  changePage(page: number){
    this.pageChange.emit(page);
  }

  changeItemsPerPage(){
    this.itemsPerPageChange.emit(this.localItemsPerPage)
  }

}
