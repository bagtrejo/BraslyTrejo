import { Routes } from '@angular/router';
import { ROUTE_PATHS } from '../../core/constants/route-paths';

export default [
  {
    path: ROUTE_PATHS.productList,
    title: 'Listado de productos',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (comp) => comp.ProductListComponent
      ),
  },
  {
    path: ROUTE_PATHS.productCreate,
    title: 'Creación de producto',
    loadComponent: () =>
      import('./pages/product-create/product-create.component').then(
        (comp) => comp.ProductCreateComponent
      ),
  },
  {
    path: ROUTE_PATHS.productEdit,
    title: 'Edición de producto',
    loadComponent: () =>
      import('./pages/product-create/product-create.component').then(
        (comp) => comp.ProductCreateComponent
      ),
  },

] as Routes;
