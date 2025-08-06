import { Component, output } from '@angular/core';

@Component({
  selector: 'app-form-actions-product',
  imports: [],
  template: `
    <div class="content">
      <button class="button" type="button" (click)="handleReset()">Reiniciar</button>
      <button class="button button--submit" type="button" (click)="onSubmit()">Enviar</button>
    </div>
  `,
  styleUrl: './form-actions-product.component.scss'
})
export class FormActionsProductComponent {
  submit = output<void>();
  reset = output<void>();

  onSubmit(){
    this.submit.emit();
  }

  handleReset(){
    this.reset.emit();
  }
}
