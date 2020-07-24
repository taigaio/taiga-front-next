/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Attribute, Component, Input, OnInit } from '@angular/core';
import { ButtonDisplay, ButtonType } from './button.model';

@Component({
  selector: 'tg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {

  // public disabled = false;
  public classList = '';
  public type = 'button';

  constructor(
    // @Attribute('disabled') disabled: boolean,
    @Attribute('class') hostClasses: string,
    @Attribute('type') type: ButtonType = 'button'
  ) {
    const classNames: string[] = hostClasses ? hostClasses.split(' ') : [];
    if (classNames.includes('btn')) {
      classNames.push('btn');
    }
    this.classList = classNames.join(' ');

    this.type = type;
  }

  @Input() display: ButtonDisplay = 'primary';
  @Input() disabled = false;

  public ngOnInit() {
    // this.classList = `${this.classList} btn-${this.display}`;
    console.log(this.disabled, this.classList,  this.type, this.display);
  }
}
