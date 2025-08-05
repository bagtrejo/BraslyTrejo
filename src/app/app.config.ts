import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { PRODUCT_REPOSITORY } from './shared/interfaces/product-repository.interface';
import { ProductApiRepository } from './core/services/product-api.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(withJsonpSupport()),
    {provide: PRODUCT_REPOSITORY, useClass: ProductApiRepository}
  ]
};  
