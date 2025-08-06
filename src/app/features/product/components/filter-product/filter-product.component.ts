import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-product',
  imports: [FormsModule],
  template: `
     <input class="search" type="text" [(ngModel)]="currentSearch" name="search" id="search" placeholder="search..." (input)="changeSearch()">
  `,
  styleUrl: './filter-product.component.scss'
})
export class FilterProductComponent {
  currentSearch = model<string>('');  
  searchChange = output<string>();

  changeSearch(){
    this.searchChange.emit(this.currentSearch());
  }

}
