/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ButtonDisplay } from './button.model';

/**
 * Taiga default button
 *
 * ### Example
 *
 * ```
 *  <button tg-button
 *    [variant]="primary"
 *    [loading]="false"
 *    [icon]="'check'"
 *    disabled="disabled"
 *    aria-label="Alternative text for the button"
 *    type="button">
 *      Text
 *   </button>
 * ```
 *
 */

/* tslint:disable:component-selector */
@Component({
  selector: '[tg-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgButtonComponent implements OnInit {

  @Input() public variant: ButtonDisplay = 'primary';
  @Input() public loading = false;
  @Input() public icon: string;

  public ngOnInit() {
    console.log(this.loading, this.icon, this.variant);
  }
}
