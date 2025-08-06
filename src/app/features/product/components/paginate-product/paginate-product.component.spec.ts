import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateProductComponent } from './paginate-product.component';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../../shared/interfaces/product.interface';
import { signal, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PaginateProductComponent', () => {
  let component: PaginateProductComponent;
  let fixture: ComponentFixture<PaginateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, PaginateProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginateProductComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the correct results count', () => {
    // Arrange
    const products: IProduct[] = [{}, {}, {}] as any;
    (component as any).filteredProducts = signal(products);
    fixture.detectChanges();

    // Act
    const span = fixture.debugElement.query(
      By.css('.pagination__results')
    ).nativeElement as HTMLElement;

    // Assert
    expect(span.textContent).toContain('3 Resultados');
  });

  it('should render the correct number of page buttons and mark the active one', () => {
    // Arrange
    (component as any).totalPages = signal(4);
    (component as any).selectedPage = signal(2);
    fixture.detectChanges();

    // Act
    const buttons = fixture.debugElement.queryAll(
      By.css('button.pagination__button')
    );

    // Assert
    expect(buttons.length).toBe(4);
    const activeButton = buttons[1].nativeElement as HTMLButtonElement;
    expect(activeButton.classList).toContain('pagination__button--active');
  });

  it('should emit pageChange when a page button is clicked', () => {
    // Arrange
    (component as any).totalPages = signal(3);
    fixture.detectChanges();
    spyOn(component.pageChange, 'emit');

    const buttons = fixture.debugElement.queryAll(
      By.css('button.pagination__button')
    );
    const secondButton = buttons[1].nativeElement as HTMLButtonElement;

    // Act
    secondButton.click();
    fixture.detectChanges();

    // Assert
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should update localItemsPerPage on itemsPerPage input change (ngOnChanges)', () => {
    // Arrange: new itemsPerPage value via signal
    const newItems = signal(5);
    (component as any).itemsPerPage = newItems;
    component.localItemsPerPage = 1;

    const changes: any = {
      itemsPerPage: new SimpleChange(1, 5, false)
    };

    // Act
    component.ngOnChanges(changes);

    // Assert
    expect(component.localItemsPerPage).toBe(5);
  });

  it('should emit itemsPerPageChange when changeItemsPerPage is called', () => {
    // Arrange
    spyOn(component.itemsPerPageChange, 'emit');
    component.localItemsPerPage = 10;

    // Act
    component.changeItemsPerPage();

    // Assert
    expect(component.itemsPerPageChange.emit).toHaveBeenCalledWith(10);
  });
});
