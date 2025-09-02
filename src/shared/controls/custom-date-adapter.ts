import { inject, Injectable, OnDestroy, Provider } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  NativeDateAdapter,
} from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable()
class AppDateAdapter extends NativeDateAdapter implements OnDestroy {
  private subs: Subscription[] = [];
  private translate = inject(TranslateService);

  constructor() {
    super();
    this.setLocale(this.translate.getCurrentLang());
    this.subs.push(this.translate.onLangChange.subscribe((e) => this.setLocale(e.lang)));
  }

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
    // We want to display the same format `dd.MM.yyyy` for all locales in the application
    // Thus, we use 'de-CH' locale for all cases
    const dtf = new Intl.DateTimeFormat('de-CH', { ...displayFormat, timeZone: 'utc' });
    return this.nativeFormat(dtf, date);
  }

  // This function is exactly the same as the function _format of the parent class `NativeDateAdapter`
  private nativeFormat(dtf: Intl.DateTimeFormat, date: Date) {
    // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
    // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
    const d = new Date();
    d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return dtf.format(d);
  }

  public ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}

const appDateFormat: MatDateFormats = Object.freeze({
  parse: {
    dateInput: null,
    timeInput: null,
  },
  display: {
    dateInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
    timeInput: { hour: '2-digit', minute: '2-digit' },
    monthYearLabel: { year: 'numeric', month: '2-digit' },
    dateA11yLabel: { year: 'numeric', month: '2-digit', day: '2-digit' },
    monthYearA11yLabel: { year: 'numeric', month: '2-digit' },
    timeOptionLabel: { hour: '2-digit', minute: '2-digit' },
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
