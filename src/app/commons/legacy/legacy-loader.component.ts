/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
