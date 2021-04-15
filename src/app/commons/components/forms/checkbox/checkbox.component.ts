/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Component, ChangeDetectionStrategy, Renderer2, ElementRef, ViewChild, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type LabelPosition = 'before' | 'after';

let nextId = 0;

@Component({
  selector: 'tg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TgCheckboxComponent,
      multi: true,
    },
  ],
})
export class TgCheckboxComponent implements ControlValueAccessor {

  constructor(
    private renderer: Renderer2
  ) {}

  @ViewChild('checkbox') public checkbox: ElementRef;
  @Input() labelPosition: LabelPosition = 'after';
  @Input() ariaLabel?: string | null = null;
  @Input() id = `tg-checkbox-${nextId++}`;

  // tslint:disable-next-line: variable-name
  onChange = (_isChecked: boolean) => {};
  onTouched = () => {};

  public writeValue(isChecked: boolean): void {
    this.onChange(isChecked);
  }

  public registerOnChange(fn: (isDisabled: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.checkbox.nativeElement, 'disabled', isDisabled);
  }

  public check = (event: any): void => {
    const isChecked: boolean = event.target.checked;
    this.writeValue(isChecked);
  }
}
