import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductComponent } from './filter-product.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FilterProductComponent', () => {
  let component: FilterProductComponent;
  let fixture: ComponentFixture<FilterProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FilterProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial currentSearch empty', () => {
    // Como currentSearch es una signal, la invocamos como función
    expect(component.currentSearch()).toBe('');
  });

  it('should update currentSearch and emit searchChange on input', () => {
    // Espiamos el emit del EventEmitter
    spyOn(component.searchChange, 'emit');

    // Obtenemos el input y simulamos la entrada de texto
    const inputDebug = fixture.debugElement.query(By.css('input.search'));
    const inputEl: HTMLInputElement = inputDebug.nativeElement;

    inputEl.value = 'hola';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Verificamos que la signal se haya actualizado
    expect(component.currentSearch()).toBe('hola');

    // Verificamos que se haya emitido el valor
    expect(component.searchChange.emit).toHaveBeenCalledWith('hola');
  });
});
