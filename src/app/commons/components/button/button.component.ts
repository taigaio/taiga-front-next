/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Attribute, Component, Input } from '@angular/core';
import { ButtonDisplay, ButtonType } from './button.model';

@Component({
  selector: 'tg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {

  public disabled = false;
  public classList = '';
  public autofocus = false;
  public type = 'button';

  constructor(
    @Attribute('disabled') disabled: boolean,
    @Attribute('class') hostClasses: string,
    @Attribute('autofocus') autofocus: boolean,
    @Attribute('type') type: ButtonType
  ) {
    const classNames: string[] = hostClasses.split(' ');
    if (classNames.indexOf('btn') === -1) {
      classNames.push('btn');
    }
    this.classList = classNames.join(' ');

    this.disabled = disabled;
    this.autofocus = autofocus;
    this.type = type;
  }

  @Input() display: ButtonDisplay = 'primary';
}
