import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { APP_ROUTE_PATHS } from '../../app/app.routes';
import { STORAGE_ROUTE_PATHS } from '../routes';
import { StorageData } from '../storage-data';

@Component({
  selector: 'app-storage-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './storage-list.html',
  styleUrl: './storage-list.scss',
})
export class StorageList {
  private router = inject(Router);
  private data = inject(StorageData);
  protected items = this.data.getAll();

  protected add() {
    this.router.navigate([APP_ROUTE_PATHS.storage.path, STORAGE_ROUTE_PATHS.Create.path]);
  }
}
