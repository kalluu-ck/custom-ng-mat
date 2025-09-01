import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { APP_ROUTE_PATHS } from '../../app/app.routes';
import { provideAppDateAdapters } from '../../shared/controls/custom-date-adapter';
import { STORAGE_ROUTE_PATHS } from '../routes';
import { StorageData } from '../storage-data';

@Component({
  selector: 'app-storage-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [provideAppDateAdapters()],
  templateUrl: './storage-create.html',
  styleUrl: './storage-create.scss',
})
export class StorageCreate {
  private router = inject(Router);
  private data = inject(StorageData);

  protected controls = {
    name: new FormControl(),
    date: new FormControl(),
    location: new FormControl(),
  };
  protected form = new FormGroup(this.controls);

  protected onSubmit() {
    console.log(this.form.value);
    this.data.add({
      name: this.controls.name.value ?? '',
      location: this.controls.location.value ?? '',
      date: this.controls.date.value ?? new Date(),
    });
    this.router.navigate([APP_ROUTE_PATHS.storage.path, STORAGE_ROUTE_PATHS.List.path]);
  }

  protected onCancelClick() {
    this.router.navigate([APP_ROUTE_PATHS.storage.path, STORAGE_ROUTE_PATHS.List.path]);
  }
}
