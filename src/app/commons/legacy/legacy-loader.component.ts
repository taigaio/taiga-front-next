/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tg-legacy-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legacy-loader.component.html',
})
export class LegacyLoaderComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private translate: TranslateService, private cd: ChangeDetectorRef) {}

  @Input()
  public component: string;

  public ngOnInit(): void {
    this.translate.onLangChange
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      requestAnimationFrame(() => {
        this.cd.detectChanges();
      });
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
