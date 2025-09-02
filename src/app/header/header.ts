import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ReactiveComponent } from '../../shared/reactive.component';
import { take, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header extends ReactiveComponent implements OnInit {
  private translate = inject(TranslateService);
  protected currentLang$ = signal<string>(this.translate.getCurrentLang());
  protected langs = this.translate.getLangs().map((x) => x.toUpperCase());

  public ngOnInit(): void {
    this.translate.onLangChange.pipe(takeUntil(this.done$)).subscribe(({ lang }) => {
      this.currentLang$.set(lang.toUpperCase());
    });
  }

  protected changeLang(lang: string) {
    this.translate.use(lang.toLowerCase()).pipe(take(1)).subscribe();
  }
}
