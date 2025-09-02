import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export class ReactiveComponent implements OnDestroy {
  protected done$ = new Subject<void>();

  ngOnDestroy(): void {
    this.done$.next();
    this.done$.complete();
  }
}
