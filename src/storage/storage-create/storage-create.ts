import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-storage-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './storage-create.html',
  styleUrl: './storage-create.scss',
})
export class StorageCreate {
  protected controls = {
    name: new FormControl(),
    date: new FormControl(),
  };
  protected form = new FormGroup(this.controls);
}
