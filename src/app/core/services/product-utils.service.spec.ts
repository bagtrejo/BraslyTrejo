import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductUtilsService } from './product-utils.service';
import { IProduct } from '../../shared/interfaces/product.interface';

describe('ProductUtilsService', () => {
  let service: ProductUtilsService;
  const products: IProduct[] = [
    { id: '1', name: 'Tarjeta credito', description: '', releaseDate: new Date(), restructureDate: new Date() } as any,
    { id: '2', name: 'Prestamo', description: '', releaseDate: new Date(), restructureDate: new Date() } as any,
    { id: '3', name: 'Cuenta', description: '', releaseDate: new Date(), restructureDate: new Date() } as any,
    { id: '4', name: 'Tarjeta debito', description: '', releaseDate: new Date(), restructureDate: new Date() } as any,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductUtilsService]
    });
    service = TestBed.inject(ProductUtilsService);
  });

  it('should filter products by name ignoring case and trimming spaces', () => {
    // Buscar "tarjeta" debe coincidir con "Tarjeta credito" y "Tarjeta debito"
    const filtrados = service.filterProducts(products, '  tarjeta  ');
    expect(filtrados.length).toBe(2);
    expect(filtrados.map(p => p.name)).toEqual(['Tarjeta credito', 'Tarjeta debito']);
  });

  it('should paginate products correctly', () => {
    // Pagina 2 con 2 items por pagina debe devolver los productos 3 y 4
    const pagina2 = service.paginateProducts(products, 2, 2);
    expect(pagina2.length).toBe(2);
    expect(pagina2.map(p => p.id)).toEqual(['3', '4']);
  });

  it('should calculate total pages correctly', () => {
    // 4 productos, 3 por página 2 páginas
    const totalPaginas = service.getTotalPages(products, 3);
    expect(totalPaginas).toBe(2);
  });

  describe('filterAndPaginate', () => {
    it('should return filtered, paginated, and totalPages after default delay', fakeAsync(() => {
      let resultado: { filtered: IProduct[]; paginated: IProduct[]; totalPages: number } | undefined;
      service.filterAndPaginate(products, 'prestamo', 1, 1).then(res => resultado = res);
      // avanzamos 500ms del setTimeout
      tick(500);

      expect(resultado).toBeDefined();
      // filtrado debe coincidir con "Prestamo"
      expect(resultado!.filtered.map(p => p.name)).toEqual(['Prestamo']);
      // paginado con 1 por pagina, página 1  solo "Prestamo"
      expect(resultado!.paginated.map(p => p.name)).toEqual(['Prestamo']);
      // totalPages = 1
      expect(resultado!.totalPages).toBe(1);
    }));

    it('should respect a custom delayMs value', fakeAsync(() => {
      let resultado: any;
      // usamos delayMs = 0 para resolución inmediata
      service.filterAndPaginate(products, '', 1, 4, 0).then(res => resultado = res);
      tick(0);

      expect(resultado).toBeDefined();
      // sin filtro - todos los productos
      expect(resultado.filtered.length).toBe(4);
      expect(resultado.paginated.length).toBe(4);
      expect(resultado.totalPages).toBe(1);
    }));
  });
});
