import { Routes } from '@angular/router';
import { ROUTE_PATHS } from './core/constants/route-paths';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ROUTE_PATHS.productList },

  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./features/product/product.routes'),
      },
    ],
  },
];
