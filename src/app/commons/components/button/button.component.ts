/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Attribute, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ButtonDisplay, ButtonType } from './button.model';

/**
 * Taiga default button
 *
 * ### Example
 *
 * ```
 *  <tg-button
 *    [variant]="primary"
 *    [loading]="false"
 *    disabled="false"
 *    aria-label="Alternative text for the button"
 *    type="button"
 *    [icon]="'check'" >
 *      Text
 *   </tg-button>
 * ```
 *
 */

@Component({
  selector: 'tg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class TgButtonComponent implements OnInit {

  constructor(
    @Attribute('type') public type: ButtonType = 'button'
  ) {}

  @Input() public variant: ButtonDisplay = 'primary';
  @Input() public loading = false;
  @Input() public icon: string;

  @HostBinding('attr.disabled') @Input() public disabled = false;
  @HostBinding('attr.aria-label') @Input() public ariaLabel: string;

  public ngOnInit() {
    // this.classList = `${this.classList} btn-${this.display}`;
    console.log(this.disabled, this.type, this.variant);
  }
}
