/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tg-legacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class LegacyComponent {
  constructor(private translate: TranslateService) {}

  @Input()
  public set translations(translations: any) {
    this.translate.setTranslation(translations.lan, translations.translationTable);
    this.translate.use(translations.lan);
  }
}
