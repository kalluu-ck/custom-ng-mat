import { Routes } from '@angular/router';

export const APP_ROUTE_PATHS = Object.freeze({
  storage: {
    path: 'storage',
  },
});

export const routes: Routes = [
  {
    path: APP_ROUTE_PATHS.storage.path,
    loadComponent: () => import('../storage/storage').then((m) => m.Storage),
    loadChildren: () => import('../storage/routes').then((m) => m.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTE_PATHS.storage.path,
  },
];
