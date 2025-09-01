import { Routes } from '@angular/router';

export const STORAGE_ROUTE_PATHS = Object.freeze({
  Create: {
    path: 'create',
  },
  List: {
    path: 'list',
  },
});

export const routes: Routes = [
  {
    path: STORAGE_ROUTE_PATHS.Create.path,
    loadComponent: () => import('./storage-create/storage-create').then((m) => m.StorageCreate),
  },
  {
    path: STORAGE_ROUTE_PATHS.List.path,
    loadComponent: () => import('./storage-list/storage-list').then((m) => m.StorageList),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: STORAGE_ROUTE_PATHS.List.path,
  },
];
