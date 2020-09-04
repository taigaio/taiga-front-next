/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, Input, ChangeDetectorRef, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tg-legacy-loader',
  templateUrl: './legacy-loader.component.html',
  styleUrls: ['../../styles/styles.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LegacyLoaderComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {}

  @Input()
  public component: string;

  @Input()
  public params: any;

  @Input()
  public events: any;

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
