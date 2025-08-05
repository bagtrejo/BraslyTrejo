import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-create',
  imports: [],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateComponent implements OnInit {
  productId = signal<string | undefined>(undefined);

  constructor(private activedRoute: ActivatedRoute){}

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.productId.set(id);

      console.log('ID: ', id);
    });
  }
 }
