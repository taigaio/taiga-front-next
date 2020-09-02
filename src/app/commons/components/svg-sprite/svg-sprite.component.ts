/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tg-svg-sprite',
  templateUrl: './svg-sprite.component.html',
  styles: [
    `:host { display: none; }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgSvgSpriteComponent {}
