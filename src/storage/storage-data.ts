import { Injectable } from '@angular/core';
import { NewStorageItem, StorageItem } from './models';

@Injectable({
  providedIn: 'root',
})
export class StorageData {
  private data: StorageItem[] = [];

  public getAll() {
    return this.data;
  }

  public add(item: NewStorageItem) {
    this.data.push({ ...item, id: this.data.length });
  }
}
