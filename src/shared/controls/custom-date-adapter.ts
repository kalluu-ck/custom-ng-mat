import { Injectable, Provider } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  NativeDateAdapter,
} from '@angular/material/core';

@Injectable()
class AppDateAdapter extends NativeDateAdapter {
  public override parse(value: any, parseFormat?: any): Date | null {
    if (!value) {
      return null;
    }

    // Expects date with format = dd.MM.yyyy
    // If not, return null.
    const tokens = (value as string).split('.');
    if (tokens.length !== 3) {
      return null;
    }

    const dd = parseFloat(tokens[0]);
    const mm = parseFloat(tokens[1]) - 1;
    const yyyy = parseFloat(tokens[2]);
    const date = new Date(yyyy, mm, dd);

    // Re-validate if the date value
    if (date.getDate() === dd && date.getMonth() === mm && date.getFullYear() === yyyy) {
      return date;
    }

    return null;
  }

  public override format(date: Date, displayFormat: Object): string {
    if (!date) {
      return '';
    }
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = date.getFullYear().toString();
    return `${dd}.${mm}.${yyyy}`;
  }
}

const appDateFormat: MatDateFormats = Object.freeze({
  parse: {
    dateInput: null,
    timeInput: null,
  },
  display: {
    dateInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
    timeInput: { hour: 'numeric', minute: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: '2-digit' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
    timeOptionLabel: { hour: 'numeric', minute: 'numeric' },
  },
});

export function provideAppDateAdapters(): Provider[] {
  return [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: appDateFormat,
    },
  ];
}
